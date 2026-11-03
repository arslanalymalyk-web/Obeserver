/* SIMULATED assistant: deterministic, rule-based answers over the sample records. There is no AI model, no network call and
   no learning. Every answer lists the records it used, separates facts from rule-based inferences, names gaps, and refuses
   advice/forecasts. To use a real model, replace answer() with a server call; the UI contract (summary/sources/gaps) can stay. */
(function (root) {
  const S = root.DemoStore, C = root.DemoCalc;
  const pct = x => (x * 100).toFixed(2) + '%';
  const num = n => Math.round(n).toLocaleString('en-US');
  const REFUSE = /(should i|should we|recommend|invest in|buy|sell|worth buying|forecast|predict|projection|will (it|the|this)|expected return|guarantee|best asset|tax advice|legal advice)/i;

  async function answer(q, ctx) {
    const text = String(q || '').trim(), low = text.toLowerCase(), periodId = ctx.periodId;
    const { assets } = await S.getAllForAssistant();
    const out = { question: text, summary: [], sources: [], gaps: [], refused: false };
    const fact = t => out.summary.push({ type: 'fact', text: t }), infer = t => out.summary.push({ type: 'inference', text: t });
    const src = (label, href) => { if (!out.sources.some(s => s.label === label)) out.sources.push({ label, href }); };
    if (!text) { out.summary.push({ type: 'fact', text: 'Ask a question or pick a suggestion.' }); return out; }
    if (REFUSE.test(low)) {
      out.refused = true;
      fact('I cannot give investment, valuation, tax or legal advice, forecasts, or recommendations to buy or sell. This demo only describes the sample records.');
      infer('Try: "Which assets are below target?", "What needs attention?", or "What changed since last period?"');
      return out;
    }
    const words = low.split(/\W+/);
    const named = assets.find(a => low.includes(a.name.toLowerCase()) || words.includes(a.name.split(' ')[0].toLowerCase()));
    const exs = await S.getExceptions(periodId, 'all');
    if (named) {
      const d = await S.getAsset(named.id, periodId), p = d.period, a = d.asset;
      fact(`${a.name} (${a.type}, ${a.location}, status ${a.status}). Period ${periodId}: income ${num(p.income)}, operating costs ${num(p.opex)}, NOI ${num(p.noi)} ${ctx.currency}.`);
      fact(`Occupancy averaged ${(p.occupancy * 100).toFixed(1)}%. Yield on cost ${pct(p.yieldOnCost)} against a target of ${pct(p.target)} (annualised).`);
      a.valuation ? fact(`Valuation ${num(a.valuation.value)} dated ${a.valuation.date}, source: ${a.valuation.source}.`) : out.gaps.push('No valuation on file, so yield on value and value share cannot be shown.');
      if (p.target - p.yieldOnCost > 0) infer(`Yield on cost is ${((p.target - p.yieldOnCost) * 100).toFixed(2)} percentage points below the configured target (rule-based comparison, not a judgement of cause).`);
      d.exceptions.forEach(e => { fact(`Open item: ${e.title}.`); });
      d.tasks.filter(t => t.status === 'Open').forEach(t => fact(`Task: ${t.title} (owner ${t.owner}, due ${t.due}).`));
      src(`Asset record ${a.id}`, `#/assets/${a.id}`); src(`Financials ${periodId}`, `#/assets/${a.id}?tab=financials`); src('Exceptions and tasks', `#/assets/${a.id}?tab=tasks`);
    } else if (/(attention|exception|issue|risk|problem|review|urgent|overdue)/.test(low)) {
      const top = exs.slice(0, 6);
      fact(`${exs.length} open items under the current rules for ${periodId}; the ${top.length} highest-severity are listed.`);
      top.forEach(e => fact(`[${e.severity}] ${e.title}. Rule: ${e.rule}.`));
      infer('Ordering is by fixed severity rules (high, medium, low), not by financial impact.');
      src('Overview: needs attention', '#/overview'); src('Records: tasks', '#/records?tab=tasks');
    } else if (/(below|target|underperform|lagging|under target|behind)/.test(low)) {
      const rows = (await S.getAssets({}, periodId)).map(a => ({ a, p: a.period })).filter(r => r.p.yieldOnCost < r.p.target);
      fact(`${rows.length} of ${assets.length} assets have a yield on cost below their target for ${periodId}.`);
      rows.sort((x, y) => (x.p.yieldOnCost - x.p.target) - (y.p.yieldOnCost - y.p.target)).forEach(r => fact(`${r.a.name}: ${pct(r.p.yieldOnCost)} vs ${pct(r.p.target)} target.`));
      infer('The target is a sample setting you can change in Settings. Assets in lease-up or refurbishment are expected to sit below a stabilised target; the rules do not account for that.');
      src('Performance', '#/performance');
    } else if (/(change|changed|since|last period|prior|previous|vs |compare|movement)/.test(low)) {
      const v = (await S.getSummary('all', periodId)).vsPrior;
      if (!v) out.gaps.push(`No comparable prior period exists in the sample data for ${periodId}.`);
      else {
        fact(`Versus ${v.prior}: NOI ${v.noiDelta >= 0 ? 'up' : 'down'} ${num(Math.abs(v.noiDelta))} ${ctx.currency}${v.noiPct == null ? '' : ' (' + (v.noiPct * 100).toFixed(1) + '%)'}, income ${v.incomeDelta >= 0 ? '+' : '-'}${num(Math.abs(v.incomeDelta))}, operating costs ${v.opexDelta >= 0 ? '+' : '-'}${num(Math.abs(v.opexDelta))}, occupancy ${(v.occDelta * 100 >= 0 ? '+' : '') + (v.occDelta * 100).toFixed(1)} points.`);
        const rec = await S.getAuditSince('2026-09-01T00:00:00Z'); rec.slice(0, 4).forEach(l => fact(`Record change ${l.at.slice(0, 10)}: ${l.action} (${l.entity}) ${l.detail}.`));
        infer('The sample data does not say why figures moved; causes would need to come from operator commentary.');
      }
      src('Overview: changes', '#/overview'); src('Audit history', '#/records?tab=audit');
    } else if (/(missing|stale|fresh|data quality|gap|outdated|valuation|document|record)/.test(low)) {
      const gaps = exs.filter(e => e.type === 'Missing data' || e.type === 'Stale data' || e.type === 'Record');
      gaps.forEach(e => fact(`${e.type}: ${e.title}. ${e.detail}`));
      if (!gaps.length) fact('No missing or stale records under the current rules.');
      fact(`Financials in the sample are closed through ${ctx.cfg.dataThrough}; source: ${ctx.cfg.financialsSource}. Demo reference date: ${ctx.cfg.demoToday}.`);
      src('Records: documents', '#/records?tab=documents'); src('Assets', '#/assets');
    } else if (/(investor|statement|report to|publish)/.test(low)) {
      const inv = await S.getInvestors();
      inv.forEach(i => fact(`${i.name}: ${i.statements.map(s => `${s.period} ${s.status}`).join(', ') || 'no statements'}.`));
      infer('A Q3 2026 statement can be drafted under Investors; publishing requires a second (Approver) demo role.');
      src('Investors', '#/investors');
    } else {
      out.gaps.push('I can only answer from the sample records in this demo and did not recognise the question.');
      infer('Try asking about attention items, assets below target, changes since the last period, missing or stale data, an asset by name, or investor statements.');
    }
    return out;
  }
  root.DemoAssistant = { answer, suggestions: ['What needs attention?', 'Which assets are below target?', 'What changed since last period?', 'Which data is missing or stale?', 'Summarise Northgate Office Park', 'What is the status of investor statements?'] };
})(window);
