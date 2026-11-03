/* Portfolio & Investor Operations: concept prototype UI. Vanilla JS, no dependencies, no network.
   All data arrives through DemoStore (replaceable boundary); all numbers come from DemoCalc. */
(function () {
  const Store = window.DemoStore, Calc = window.DemoCalc, I = window.DemoI18n, Asst = window.DemoAssistant;
  const t = I.t;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const S = { periodId: '2026-Q3', portfolio: 'all', role: 'Analyst', theme: 'system', cfg: null, periods: [], portfolios: [], filter: { q: '', type: '', status: '', exceptionsOnly: false }, answers: [], docFilter: '', mode: 'standalone', me: null };

  // ── formatting (driven by configuration, never hard-coded to a region) ──
  const money = (n, compact) => n == null ? '—' : new Intl.NumberFormat(S.cfg.locale, { style: 'currency', currency: S.cfg.currency, maximumFractionDigits: compact ? 2 : 0, notation: compact ? 'compact' : 'standard' }).format(n);
  const num = n => new Intl.NumberFormat(S.cfg.locale, { maximumFractionDigits: 0 }).format(n);
  const pct = (x, dp = 1) => x == null ? '—' : new Intl.NumberFormat(S.cfg.locale, { style: 'percent', minimumFractionDigits: dp, maximumFractionDigits: dp }).format(x);
  const pp = x => (x >= 0 ? '+' : '−') + new Intl.NumberFormat(S.cfg.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(x * 100)) + ' pp';
  const date = iso => iso ? new Intl.DateTimeFormat(S.cfg.locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(iso.length === 10 ? iso + 'T00:00:00Z' : iso)) : '—';
  const monthLabel = m => new Intl.DateTimeFormat(S.cfg.locale, { month: 'short', year: '2-digit', timeZone: 'UTC' }).format(new Date(m + '-01T00:00:00Z'));
  const signed = n => (n >= 0 ? '+' : '−') + money(Math.abs(n));
  const periodLabel = id => (S.periods.find(p => p.id === id) || {}).label || id;

  const pill = (text, kind) => `<span class="pill ${kind}">${esc(text)}</span>`;
  const statusKind = s => ({ Approved: 'good', Published: 'good', 'Pending review': 'warn', 'In review': 'info', Draft: 'neutral', Missing: 'bad', Expired: 'bad', Rejected: 'bad', Done: 'good', Open: 'warn' }[s] || 'neutral');
  const sevKind = s => ({ high: 'bad', medium: 'warn', low: 'neutral' }[s]);
  const sample = () => `<span class="tag-sample">${esc(t('sample data'))}</span>`;
  const targetPill = (y, target) => {
    const d = y - target, short = S.cfg.thresholds.yieldShortfall;
    return d >= 0 ? pill(t('At or above target'), 'good') : d > -short ? pill(t('Slightly below target'), 'warn') : pill(t('Below target'), 'bad');
  };
  // Arrow shows the direction of the change; colour shows whether it is good (green) or bad (red). For costs, lower is good.
  const delta = (d, fmt, lowerIsGood) => d == null ? `<span class="delta flat">${esc(t('no prior period in sample'))}</span>` : `<span class="delta ${d === 0 ? 'flat' : (d > 0) !== !!lowerIsGood ? 'up' : 'down'}">${d > 0 ? '▲' : d < 0 ? '▼' : '■'} ${esc(fmt(d))}</span>`;

  // ── routing ──
  const parse = () => {
    const h = location.hash.replace(/^#\/?/, ''), [path, qs] = h.split('?'), parts = (path || 'overview').split('/');
    return { route: parts[0] || 'overview', id: parts[1] || null, q: Object.fromEntries(new URLSearchParams(qs || '')) };
  };
  const toast = (msg, bad) => { const el = document.createElement('div'); el.className = 'toast' + (bad ? ' bad' : ''); el.textContent = msg; $('toast-host').replaceChildren(el); setTimeout(() => el.remove(), 4500); };
  const dlg = $('dlg');
  $('dlg-x').onclick = () => dlg.close();
  function openDialog(title, bodyHtml, actions = []) {
    $('dlg-title').textContent = title; $('dlg-body').innerHTML = bodyHtml;
    const foot = $('dlg-foot'); foot.replaceChildren();
    [...actions, { label: t('Close'), onClick: () => dlg.close() }].forEach(a => {
      const b = document.createElement('button'); b.className = 'btn' + (a.primary ? ' primary' : ''); b.textContent = a.label; if (a.disabled) { b.disabled = true; b.title = a.why || ''; }
      b.onclick = async () => { try { await a.onClick(); } catch (e) { toast(e.message, true); } }; foot.appendChild(b);
    });
    if (!dlg.open) dlg.showModal();
  }

  // ── shared pieces ──
  const periodSelect = () => `<label class="ctrl">${esc(t('Reporting period'))}<select data-bind="period">${S.periods.map(p => `<option value="${esc(p.id)}"${p.id === S.periodId ? ' selected' : ''}>${esc(p.label)}</option>`).join('')}</select></label>`;
  const portfolioSelect = () => `<label class="ctrl">${esc(t('Portfolio'))}<select data-bind="portfolio"><option value="all">${esc(t('All portfolios'))}</option>${S.portfolios.map(p => `<option value="${esc(p.id)}"${p.id === S.portfolio ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label>`;
  const head = (title, sub, ctrls = '') => `<div class="top"><div><h1>${esc(title)}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div><div class="ctrls">${ctrls}</div></div>`;
  const assumptions = () => `${esc(t('Currency'))}: ${esc(S.cfg.currency)} (${esc(t('sample configuration, no FX conversion'))}) · ${esc(t('Source'))}: ${esc(S.cfg.financialsSource)} · ${esc(t('Closed through'))} ${esc(date(S.cfg.dataThrough))}`;
  const empty = msg => `<div class="empty">${esc(msg)}</div>`;

  function barChart(series, selected, targetLine) {
    const W = 640, H = 230, pad = { l: 52, r: 8, t: 14, b: 30 }, max = Math.max(...series.map(s => s.noi), targetLine) * 1.12, bw = (W - pad.l - pad.r) / series.length;
    const y = v => pad.t + (H - pad.t - pad.b) * (1 - v / max);
    const grid = [0, .5, 1].map(f => { const val = max / 1.12 * f, yy = y(val).toFixed(1); return `<line x1="${pad.l}" x2="${W - pad.r}" y1="${yy}" y2="${yy}" stroke="var(--border)"/><text x="0" y="${(+yy + 4)}">${esc(money(val, true))}</text>`; }).join('');
    const bars = series.map((s, i) => { const x = pad.l + i * bw + bw * .16, w = bw * .68, sel = selected.includes(s.month);
      return `<g><title>${esc(monthLabel(s.month))}: ${esc(money(s.noi))}</title><rect x="${x.toFixed(1)}" y="${y(s.noi).toFixed(1)}" width="${w.toFixed(1)}" height="${(H - pad.b - y(s.noi)).toFixed(1)}" rx="3" fill="var(--accent)" opacity="${sel ? 1 : .38}"/><text x="${(x + w / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle">${esc(monthLabel(s.month))}</text></g>`; }).join('');
    const ty = y(targetLine).toFixed(1);
    return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t('Monthly net operating income'))}: ${esc(money(series[0].noi))} → ${esc(money(series[series.length - 1].noi))}. ${esc(t('Dashed line is the target-yield monthly NOI.'))}">${grid}${bars}<line x1="${pad.l}" x2="${W - pad.r}" y1="${ty}" y2="${ty}" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 4"/><text x="${W - pad.r}" y="${(ty - 5)}" text-anchor="end" style="fill:var(--warn);font-weight:600">${esc(t('Target'))} ${esc(money(targetLine, true))}</text></svg>
      <div class="legend"><span><i style="background:var(--accent)"></i>${esc(t('Selected period'))}</span><span><i style="background:var(--accent);opacity:.38"></i>${esc(t('Other months'))}</span><span><i style="background:var(--warn)"></i>${esc(t('Target-yield monthly NOI'))}</span></div></div>
      <details class="method" style="margin-top:10px"><summary>${esc(t('Chart data (table)'))}</summary><div class="tblwrap"><table><thead><tr><th>${esc(t('Month'))}</th><th class="num">${esc(t('Income'))}</th><th class="num">NOI</th></tr></thead><tbody>${series.map(s => `<tr><td>${esc(monthLabel(s.month))}</td><td class="num">${esc(money(s.income))}</td><td class="num">${esc(money(s.noi))}</td></tr>`).join('')}</tbody></table></div></details>`;
  }

  function csvDownload(name, rows) {
    const cell = v => { let s = String(v ?? ''); if (/^[=+\-@]/.test(s)) s = "'" + s; return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const blob = new Blob(['﻿' + rows.map(r => r.map(cell).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ── views ──
  async function viewOverview() {
    const [sum, ex, assets, audit] = await Promise.all([Store.getSummary(S.portfolio, S.periodId), Store.getExceptions(S.periodId, S.portfolio), Store.getAssets({ portfolio: S.portfolio }, S.periodId), Store.getAudit()]);
    const c = sum.current, v = sum.vsPrior, tgt = sum.targetMonthlyNoi, yc = c.yieldOnCost, avgTarget = c.cost ? (tgt * 12) / c.cost : S.cfg.targetYield;
    const stat = Object.entries(sum.statusCounts).map(([k, n]) => `${n} ${esc(k)}`).join(' · ');
    const kpi = (label, value, note, extra = '') => `<div class="card kpi"><div class="label">${esc(label)}</div><div class="value">${value}</div><div class="note">${note}</div>${extra}</div>`;
    return head(t('Portfolio overview'), `${esc(periodLabel(S.periodId))} · ${assumptions()}`, periodSelect() + portfolioSelect()) +
      `<div class="grid kpis">
        ${kpi(t('Assets'), num(c.assetCount), esc(stat))}
        ${kpi(t('Portfolio value'), esc(money(c.value, true)), `${esc(t('From'))} ${c.valuedCount} ${esc(t('of'))} ${c.assetCount} ${esc(t('assets with a valuation on file'))}${sum.oldestValuation ? `; ${esc(t('oldest dated'))} ${esc(date(sum.oldestValuation))}` : ''}. ${esc(t('Mixed valuation dates and sources.'))}`)}
        ${kpi(t('Income'), esc(money(c.income, true)), delta(v && v.incomeDelta, signed) + (v ? ` ${esc(t('vs'))} ${esc(periodLabel(v.prior))}` : ''))}
        ${kpi(t('Operating costs'), esc(money(c.opex, true)), delta(v && v.opexDelta, signed, true) + (v ? ` ${esc(t('vs'))} ${esc(periodLabel(v.prior))}` : ''))}
        ${kpi(t('Net operating income'), esc(money(c.noi, true)), delta(v && v.noiDelta, signed) + (v ? ` ${esc(t('vs'))} ${esc(periodLabel(v.prior))}` : ''))}
        ${kpi(t('NOI yield on cost (annualised)'), esc(pct(yc, 2)), `${esc(t('Target'))} ${esc(pct(avgTarget, 2))} · ${targetPill(yc, avgTarget)}`)}
        ${kpi(t('Occupancy (rent-weighted)'), esc(pct(c.occupancy)), delta(v && v.occDelta, d => pp(d)) + (v ? ` ${esc(t('vs'))} ${esc(periodLabel(v.prior))}` : ''))}
      </div>
      <div class="grid cols2" style="margin-top:14px">
        <section class="card"><header><h2>${esc(t('Monthly net operating income'))}</h2>${sample()}</header>${barChart(sum.series, sum.periodMonths, tgt)}</section>
        <section class="card"><header><h2>${esc(t('Data freshness and coverage'))}</h2></header>
          <dl class="dl"><dt>${esc(t('Reporting period'))}</dt><dd>${esc(periodLabel(S.periodId))}</dd><dt>${esc(t('Financials closed through'))}</dt><dd>${esc(date(S.cfg.dataThrough))}</dd><dt>${esc(t('Financial source'))}</dt><dd>${esc(S.cfg.financialsSource)}</dd><dt>${esc(t('Demo reference date'))}</dt><dd>${esc(date(S.cfg.demoToday))} <span class="muted small">(${esc(t('fixed, not today'))})</span></dd><dt>${esc(t('Valuation coverage'))}</dt><dd>${c.valuedCount}/${c.assetCount}</dd><dt>${esc(t('Connections'))}</dt><dd>${pill(t('Not connected'), 'neutral')} <span class="muted small">${esc(t('ledger, valuations, documents, identity'))}</span></dd></dl></section>
      </div>
      <div class="grid cols2e" style="margin-top:14px">
        <section class="card"><header><h2>${esc(t('Needs attention'))} (${ex.length})</h2><a href="#/records?tab=tasks">${esc(t('Open records'))}</a></header>
          ${ex.length ? `<ul class="list">${ex.slice(0, 6).map(e => `<li><div><div class="t"><a href="#/assets/${esc(e.assetId)}?tab=tasks">${esc(e.title)}</a></div><div class="d">${esc(e.detail)} <span class="mono">${esc(t('Rule'))}: ${esc(e.rule)}</span></div></div><div>${pill(t(e.severity), sevKind(e.severity))}</div></li>`).join('')}</ul>` : empty(t('No open items under the current rules.'))}</section>
        <section class="card"><header><h2>${esc(t('Recent changes'))}</h2><a href="#/records?tab=audit">${esc(t('Audit history'))}</a></header>
          <ul class="list">${audit.slice(0, 6).map(l => `<li><div><div class="t">${esc(l.action)}</div><div class="d">${esc(l.detail)} · ${esc(l.actor)}</div></div><div class="muted small">${esc(date(l.at))}</div></li>`).join('')}</ul></section>
      </div>
      <details class="method" style="margin-top:14px"><summary>${esc(t('Methodology and assumptions'))}</summary>${methodology()}</details>`;
  }

  function methodology() {
    return `<p class="small muted" style="margin:8px 0">${esc(t('Sample methodology for demonstration, not an accounting standard. Every figure can be reproduced from the monthly inputs on each asset’s Financials tab.'))}</p>
      <code class="formula">${esc(t('Total income'))} = ${esc(t('gross potential rent'))} × ${esc(t('occupancy'))} + ${esc(t('other income'))}</code>
      <code class="formula">NOI = ${esc(t('total income'))} − ${esc(t('operating costs'))} (${esc(t('excludes capex, debt service and income tax'))})</code>
      <code class="formula">${esc(t('Yield on cost'))} = NOI × 12 ÷ ${esc(t('months in period'))} ÷ ${esc(t('acquisition cost'))}</code>
      <code class="formula">${esc(t('Yield on value'))} = ${esc(t('annualised NOI'))} ÷ ${esc(t('current valuation'))} (${esc(t('not shown when no valuation is on file'))})</code>
      <code class="formula">${esc(t('Rent-weighted occupancy'))} = Σ(${esc(t('gross potential rent'))} × ${esc(t('occupancy'))}) ÷ Σ ${esc(t('gross potential rent'))}</code>
      <p class="small muted">${esc(t('Target yield is a configurable setting'))}: ${esc(pct(S.cfg.targetYield, 2))}. ${esc(t('Annualising a short period assumes it repeats and is not a forecast.'))}</p>`;
  }

  async function viewAssets() {
    const [facets] = await Promise.all([Store.getFacets()]);
    const f = S.filter;
    return head(t('Asset registry'), `${esc(periodLabel(S.periodId))} · ${assumptions()}`, periodSelect() + portfolioSelect() + (S.mode === 'connected' ? `<button class="btn primary" data-act="add-asset">${esc(t('Add asset'))}</button>` : `<button class="btn" disabled title="${esc(t('Needs connected mode'))}">${esc(t('Add asset'))}</button>`)) +
      `<section class="card"><div class="ctrls" style="margin-bottom:12px">
        <label class="ctrl">${esc(t('Search'))}<input type="search" id="f-q" value="${esc(f.q)}" placeholder="${esc(t('Name, location or type'))}"></label>
        <label class="ctrl">${esc(t('Type'))}<select id="f-type"><option value="">${esc(t('All'))}</option>${facets.types.map(x => `<option${f.type === x ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select></label>
        <label class="ctrl">${esc(t('Status'))}<select id="f-status"><option value="">${esc(t('All'))}</option>${facets.statuses.map(x => `<option${f.status === x ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select></label>
        <label class="ctrl" style="flex-direction:row;align-items:center;gap:6px;padding-bottom:8px"><input type="checkbox" id="f-ex"${f.exceptionsOnly ? ' checked' : ''}> ${esc(t('Only assets with open items'))}</label></div>
        <div id="asset-table" class="tblwrap" aria-live="polite"></div></section>`;
  }
  async function fillAssetTable() {
    const f = S.filter, list = await Store.getAssets({ portfolio: S.portfolio, ...f }, S.periodId), box = $('asset-table'); if (!box) return;
    box.innerHTML = list.length ? `<table><caption class="sr-only">${esc(t('Assets'))}</caption><thead><tr><th>${esc(t('Asset'))}</th><th>${esc(t('Type'))}</th><th>${esc(t('Status'))}</th><th class="num">${esc(t('Occupancy'))}</th><th class="num">NOI</th><th class="num">${esc(t('Yield on cost'))}</th><th>${esc(t('vs target'))}</th><th>${esc(t('Valuation (date)'))}</th><th class="num">${esc(t('Open items'))}</th></tr></thead><tbody>${list.map(a => `<tr class="click" data-href="#/assets/${esc(a.id)}"><td><a href="#/assets/${esc(a.id)}"><strong>${esc(a.name)}</strong></a><div class="muted small">${esc(a.location)} · ${esc(S.portfolios.find(p => p.id === a.portfolio).name)}</div></td><td>${esc(a.type)}</td><td>${pill(a.status, a.status === 'Stabilised' ? 'good' : 'info')}</td><td class="num">${esc(pct(a.period.occupancy))}</td><td class="num">${esc(money(a.period.noi))}</td><td class="num">${esc(pct(a.period.yieldOnCost, 2))}</td><td>${targetPill(a.period.yieldOnCost, a.period.target)}</td><td>${a.valuation ? `${esc(money(a.valuation.value, true))}<div class="muted small">${esc(date(a.valuation.date))}</div>` : pill(t('No valuation on file'), 'bad')}</td><td class="num">${a.exceptionCount ? pill(a.exceptionCount, 'warn') : '0'}</td></tr>`).join('')}</tbody></table>`
      : empty(t('No assets match these filters.'));
  }

  async function viewAsset(id, tab) {
    const d = await Store.getAsset(id, S.periodId), a = d.asset, p = d.period, tabs = ['summary', 'financials', 'leases', 'documents', 'tasks', 'history'];
    tab = tabs.includes(tab) ? tab : 'summary';
    const tabNav = `<nav class="tabs" aria-label="${esc(t('Asset sections'))}">${tabs.map(x => `<a href="#/assets/${esc(id)}?tab=${x}"${x === tab ? ' aria-current="page"' : ''}>${esc(t({ summary: 'Summary', financials: 'Financials', leases: 'Occupancy and leases', documents: 'Documents', tasks: 'Tasks and exceptions', history: 'Change history' }[x]))}</a>`).join('')}</nav>`;
    let body = '';
    if (tab === 'summary') {
      const age = a.valuation ? Calc.daysBetween(a.valuation.date, S.cfg.demoToday) : null;
      const stale = age != null && age > S.cfg.thresholds.valuationMaxAgeDays;
      body = `<div class="grid cols2e"><section class="card"><header><h2>${esc(t('Record'))}</h2>${sample()}</header><dl class="dl">
        <dt>${esc(t('Type'))}</dt><dd>${esc(a.type)}</dd><dt>${esc(t('Location'))}</dt><dd>${esc(a.location)}</dd><dt>${esc(t('Portfolio'))}</dt><dd>${esc(d.portfolio.name)}</dd>
        <dt>${esc(t('Ownership'))}</dt><dd>${d.owners.length ? d.owners.map(o => `${esc(o.name)} ${esc(pct(o.share, 0))}`).join('<br>') : '—'}<div class="muted small">${esc(t('Remaining ownership is not recorded in the sample.'))}</div></dd>
        <dt>${esc(t('Acquired'))}</dt><dd>${esc(date(a.acquired))}</dd><dt>${esc(t('Acquisition cost'))}</dt><dd>${esc(money(a.cost))}</dd>
        <dt>${esc(t('Current valuation'))}</dt><dd>${a.valuation ? `${esc(money(a.valuation.value))}<div class="small muted">${esc(t('As at'))} ${esc(date(a.valuation.date))} · ${esc(a.valuation.source)} ${stale ? pill(`${age} ${t('days old')}`, 'warn') : ''}</div>` : `${pill(t('No valuation on file'), 'bad')}<div class="small muted">${esc(t('Yield on value and value share cannot be calculated.'))}</div>`}</dd>
        <dt>${esc(t('Status'))}</dt><dd>${esc(a.status)}</dd>${S.mode === 'connected' ? `<dt>${esc(t('Valuation'))}</dt><dd><button class="btn small" data-act="valuation" data-id="${esc(a.id)}"${S.role === 'Approver' ? '' : ' disabled title="' + esc(t('Only an Approver can record valuations')) + '"'}>${esc(t('Record valuation'))}</button></dd>` : ''}<dt>${esc(t('Capacity'))}</dt><dd>${esc(num(a.capacity))} ${esc(a.unit)}</dd></dl></section>
        <section class="card"><header><h2>${esc(periodLabel(S.periodId))}</h2>${periodSelect()}</header><dl class="dl">
        <dt>${esc(t('Income'))}</dt><dd>${esc(money(p.income))}</dd><dt>${esc(t('Operating costs'))}</dt><dd>${esc(money(p.opex))}</dd><dt>NOI</dt><dd>${esc(money(p.noi))} ${d.prior ? delta(p.noi - d.prior.noi, signed) + ` <span class="muted small">${esc(t('vs'))} ${esc(periodLabel(d.prior.periodId))}</span>` : ''}</dd>
        <dt>${esc(t('Occupancy'))}</dt><dd>${esc(pct(p.occupancy))} <span class="muted small">(${esc(t('average of months'))})</span></dd>
        <dt>${esc(t('Yield on cost'))}</dt><dd>${esc(pct(p.yieldOnCost, 2))} ${targetPill(p.yieldOnCost, p.target)}<div class="small muted">${esc(money(p.noi))} × ${12 / p.months} ÷ ${esc(money(a.cost))} · ${esc(t('Target'))} ${esc(pct(p.target, 2))}</div></dd>
        <dt>${esc(t('Yield on value'))}</dt><dd>${p.yieldOnValue == null ? '—' : esc(pct(p.yieldOnValue, 2))}<div class="small muted">${a.valuation ? `${esc(money(p.noi))} × ${12 / p.months} ÷ ${esc(money(a.valuation.value))}` : esc(t('Needs a valuation'))}</div></dd></dl>
        ${a.internalNote ? `<div class="notice warn" style="margin-top:12px"><strong>${esc(t('Internal-only note'))}</strong>: ${esc(a.internalNote)} <span class="muted">(${esc(t('never shown in the investor view'))})</span></div>` : ''}</section></div>`;
    } else if (tab === 'financials') {
      const sel = new Set(d.periodMonths);
      body = `<section class="card"><header><h2>${esc(t('Monthly inputs and results'))}</h2><div class="ctrls">${periodSelect()}<button class="btn small" data-act="csv-asset" data-id="${esc(id)}">${esc(t('Export CSV'))}</button></div></header>
        <p class="small muted" style="margin-bottom:8px">${assumptions()}</p><div class="tblwrap"><table><thead><tr><th>${esc(t('Month'))}</th><th class="num">${esc(t('Occupancy'))}</th><th class="num">${esc(t('Rental income'))}</th><th class="num">${esc(t('Other income'))}</th><th class="num">${esc(t('Total income'))}</th><th class="num">${esc(t('Operating costs'))}</th><th class="num">NOI</th></tr></thead><tbody>
        ${d.monthly.map(m => `<tr${sel.has(m.month) ? ' style="background:var(--accent-soft)"' : ''}><td>${esc(monthLabel(m.month))}</td><td class="num">${esc(pct(m.occ, 0))}</td><td class="num">${esc(money(m.rental))}</td><td class="num">${esc(money(m.other))}</td><td class="num">${esc(money(m.income))}</td><td class="num">${esc(money(m.opex))}</td><td class="num"><strong>${esc(money(m.noi))}</strong></td></tr>`).join('')}
        <tr><th>${esc(periodLabel(S.periodId))}</th><th class="num">${esc(pct(p.occupancy))}</th><th></th><th></th><th class="num">${esc(money(p.income))}</th><th class="num">${esc(money(p.opex))}</th><th class="num">${esc(money(p.noi))}</th></tr></tbody></table></div>
        <p class="small muted" style="margin-top:8px">${esc(t('Highlighted rows are in the selected period.'))} ${esc(t('Gross potential rent'))}: ${esc(money(a.gpr))}/${esc(t('month'))}. ${esc(t('Rental income'))} = ${esc(t('gross potential rent'))} × ${esc(t('occupancy'))}.</p>
        <details class="method" style="margin-top:10px"><summary>${esc(t('Methodology and assumptions'))}</summary>${methodology()}</details></section>`;
    } else if (tab === 'leases') {
      body = `<section class="card"><header><h2>${esc(t('Leases and lease events'))}</h2>${sample()}</header>${d.leases.length ? `<div class="tblwrap"><table><thead><tr><th>${esc(t('Tenant'))}</th><th>${esc(t('Space'))}</th><th>${esc(t('Lease end'))}</th><th>${esc(t('Time to expiry'))}</th><th>${esc(t('Note'))}</th></tr></thead><tbody>${d.leases.map(l => { const dd = Calc.daysBetween(S.cfg.demoToday, l.end); return `<tr><td>${esc(l.tenant)}</td><td>${esc(l.space)}</td><td>${esc(date(l.end))}</td><td>${dd <= S.cfg.thresholds.leaseExpiryDays ? pill(`${dd} ${t('days')}`, 'warn') : `${dd} ${esc(t('days'))}`}</td><td>${esc(l.note)}</td></tr>`; }).join('')}</tbody></table></div>` : empty(t('No lease records in the sample for this asset.'))}
        <p class="small muted" style="margin-top:8px">${esc(t('Latest-month occupancy'))}: ${esc(pct(d.monthly[d.monthly.length - 1].occ, 0))} · ${esc(t('Capacity'))} ${esc(num(a.capacity))} ${esc(a.unit)}. ${esc(t('Lease events are flagged within'))} ${S.cfg.thresholds.leaseExpiryDays} ${esc(t('days of the demo reference date'))}.</p></section>`;
    } else if (tab === 'documents') {
      body = `<section class="card"><header><h2>${esc(t('Documents'))}</h2>${sample()}</header>${docTable(d.documents)}<p class="small muted" style="margin-top:8px">${esc(t('Sample records only: no files are stored and nothing here is secured or enforced by a backend.'))}</p></section>`;
    } else if (tab === 'tasks') {
      body = `<div class="grid cols2e"><section class="card"><header><h2>${esc(t('Exceptions'))} (${d.exceptions.length})</h2></header>${d.exceptions.length ? `<ul class="list">${d.exceptions.map(e => `<li><div><div class="t">${esc(e.title)}</div><div class="d">${esc(e.detail)}<br><span class="mono">${esc(t('Rule'))}: ${esc(e.rule)}</span></div></div>${pill(t(e.severity), sevKind(e.severity))}</li>`).join('')}</ul>` : empty(t('No open exceptions.'))}</section>
        <section class="card"><header><h2>${esc(t('Tasks'))}</h2></header>${taskTable(d.tasks)}</section></div>`;
    } else {
      body = `<section class="card"><header><h2>${esc(t('Change history'))}</h2></header>${auditTable(d.history)}</section>`;
    }
    return `<p class="small" style="margin-bottom:8px"><a href="#/assets">← ${esc(t('Asset registry'))}</a></p>` + head(a.name, `${esc(a.type)} · ${esc(a.location)} · ${pill(a.status, a.status === 'Stabilised' ? 'good' : 'info')} ${sample()}`) + tabNav + body;
  }

  const docTable = (docs, withActions) => docs.length ? `<div class="tblwrap"><table><thead><tr><th>${esc(t('Document'))}</th><th>${esc(t('Subject'))}</th><th>${esc(t('Status'))}</th><th>${esc(t('Owner'))}</th><th>${esc(t('Due'))}</th><th>${esc(t('Expires'))}</th><th>${esc(t('Visible to'))}</th>${withActions ? `<th>${esc(t('Review'))}</th>` : ''}</tr></thead><tbody>${docs.map(d => `<tr><td><strong>${esc(d.name)}</strong><div class="muted small">${esc(d.type)}</div></td><td>${esc(d.ref)}</td><td>${pill(t(d.status), statusKind(d.status))}</td><td>${esc(d.owner)}</td><td>${esc(date(d.due))}</td><td>${esc(date(d.expires))}</td><td>${esc(d.visibility === 'investor' ? t('Investor') : t('Internal only'))}</td>${withActions ? `<td>${d.status === 'Pending review' ? `<button class="btn small" data-act="doc" data-d="approve" data-id="${esc(d.id)}">${esc(t('Approve'))}</button> <button class="btn small" data-act="doc" data-d="reject" data-id="${esc(d.id)}">${esc(t('Reject'))}</button>` : ''}</td>` : ''}</tr>`).join('')}</tbody></table></div>` : empty(t('No documents.'));
  const taskTable = tasks => tasks.length ? `<div class="tblwrap"><table><thead><tr><th>${esc(t('Task'))}</th><th>${esc(t('Owner'))}</th><th>${esc(t('Due'))}</th><th>${esc(t('Priority'))}</th><th>${esc(t('Status'))}</th><th></th></tr></thead><tbody>${tasks.map(x => `<tr><td>${esc(x.title)}<div class="muted small">${esc(x.assetId)}</div></td><td>${esc(x.owner)}</td><td>${esc(date(x.due))}</td><td>${esc(t(x.priority))}</td><td>${pill(t(x.status), statusKind(x.status))}</td><td><button class="btn small" data-act="task" data-id="${esc(x.id)}">${esc(x.status === 'Done' ? t('Reopen') : t('Mark done'))}</button></td></tr>`).join('')}</tbody></table></div><p class="small muted" style="margin-top:6px">${esc(t('Changes are kept in memory for this session only and are recorded in the audit history.'))}</p>` : empty(t('No tasks.'));
  const auditTable = rows => rows.length ? `<div class="tblwrap"><table><thead><tr><th>${esc(t('When'))}</th><th>${esc(t('Action'))}</th><th>${esc(t('Subject'))}</th><th>${esc(t('Detail'))}</th><th>${esc(t('By'))}</th></tr></thead><tbody>${rows.map(l => `<tr><td>${esc(date(l.at))}${l.session ? ` ${pill(t('this session'), 'info')}` : ''}</td><td>${esc(l.action)}</td><td>${esc(l.entity)}</td><td>${esc(l.detail)}</td><td>${esc(l.actor)}</td></tr>`).join('')}</tbody></table></div>` : empty(t('No history recorded.'));

  async function viewPerformance() {
    const [assets, sum, ex] = await Promise.all([Store.getAssets({ portfolio: S.portfolio }, S.periodId), Store.getSummary(S.portfolio, S.periodId), Store.getExceptions(S.periodId, S.portfolio)]);
    const c = sum.current, priorByAsset = {};
    if (sum.prior) sum.prior.assets.forEach(x => { priorByAsset[x.assetId] = x; });
    const review = ex.filter(e => e.type === 'Performance' || e.type === 'Lease event');
    return head(t('Performance and financials'), `${esc(periodLabel(S.periodId))} · ${assumptions()}`, periodSelect() + portfolioSelect() + `<button class="btn" data-act="csv-perf">${esc(t('Export CSV'))}</button>`) +
      `<section class="card"><header><h2>${esc(t('Asset performance'))}</h2><span class="muted small">${esc(sum.prior ? `${t('Compared with')} ${periodLabel(sum.prior.periodId)}` : t('No comparable prior period in the sample for this selection'))}</span></header><div class="tblwrap"><table><thead><tr><th>${esc(t('Asset'))}</th><th class="num">${esc(t('Income'))}</th><th class="num">${esc(t('Operating costs'))}</th><th class="num">NOI</th><th class="num">${esc(t('Change in NOI'))}</th><th class="num">${esc(t('Occupancy'))}</th><th class="num">${esc(t('Yield on cost'))}</th><th class="num">${esc(t('Yield on value'))}</th><th class="num">${esc(t('Target'))}</th><th>${esc(t('vs target'))}</th></tr></thead><tbody>
      ${assets.map(a => { const p = a.period, pr = priorByAsset[a.id]; return `<tr><td><a href="#/assets/${esc(a.id)}?tab=financials">${esc(a.name)}</a></td><td class="num">${esc(money(p.income))}</td><td class="num">${esc(money(p.opex))}</td><td class="num">${esc(money(p.noi))}</td><td class="num">${pr ? delta(p.noi - pr.noi, signed) : '—'}</td><td class="num">${esc(pct(p.occupancy))}</td><td class="num">${esc(pct(p.yieldOnCost, 2))}</td><td class="num">${p.yieldOnValue == null ? `<span title="${esc(t('No valuation on file'))}">n/a</span>` : esc(pct(p.yieldOnValue, 2))}</td><td class="num">${esc(pct(p.target, 2))}</td><td>${targetPill(p.yieldOnCost, p.target)}</td></tr>`; }).join('')}
      <tr><th>${esc(t('Total'))}</th><th class="num">${esc(money(c.income))}</th><th class="num">${esc(money(c.opex))}</th><th class="num">${esc(money(c.noi))}</th><th class="num">${sum.vsPrior ? delta(sum.vsPrior.noiDelta, signed) : '—'}</th><th class="num">${esc(pct(c.occupancy))}</th><th class="num">${esc(pct(c.yieldOnCost, 2))}</th><th></th><th></th><th></th></tr></tbody></table></div>
      <p class="small muted" style="margin-top:8px">${esc(t('"n/a" means no valuation is on file; it is not zero.'))} ${esc(t('Annualising a short period assumes it repeats and is not a forecast.'))}</p></section>
      <div class="grid cols2" style="margin-top:14px"><section class="card"><header><h2>${esc(t('Monthly net operating income'))}</h2></header>${barChart(sum.series, sum.periodMonths, sum.targetMonthlyNoi)}</section>
      <section class="card"><header><h2>${esc(t('Exceptions needing review'))}</h2></header>${review.length ? `<ul class="list">${review.slice(0, 8).map(e => `<li><div><div class="t"><a href="#/assets/${esc(e.assetId)}?tab=tasks">${esc(e.title)}</a></div><div class="d mono">${esc(t('Rule'))}: ${esc(e.rule)}</div></div>${pill(t(e.severity), sevKind(e.severity))}</li>`).join('')}</ul>` : empty(t('No performance exceptions.'))}</section></div>
      <details class="method" style="margin-top:14px"><summary>${esc(t('Methodology and assumptions'))}</summary>${methodology()}</details>`;
  }

  async function viewInvestors() {
    const rows = (await Store.getInvestorSummaries(S.periodId)).map(i => ({ i, snap: i.snap }));
    const stmt = i => i.statements.find(s => s.period === S.periodId);
    return head(t('Investors'), `${esc(periodLabel(S.periodId))} · ${esc(t('Statement workflow: draft, submit, approve (second demo role), publish'))}`, periodSelect()) +
      `<div class="notice info" style="margin-bottom:14px">${esc(t('Demo role'))}: <strong>${esc(t(S.role))}</strong>. ${esc(t('Roles here are a visual demonstration only; a real system must enforce them on a server. Approval needs a different role from the preparer.'))}</div>
      <section class="card"><div class="tblwrap"><table><thead><tr><th>${esc(t('Investor'))}</th><th>${esc(t('Holdings'))}</th><th class="num">${esc(t('Share of income'))}</th><th class="num">${esc(t('Share of NOI'))}</th><th>${esc(t('Statement'))} ${esc(periodLabel(S.periodId))}</th><th>${esc(t('Action'))}</th></tr></thead><tbody>
      ${rows.map(({ i, snap }) => { const s = stmt(i); const act = !s ? `<button class="btn small primary" data-act="stmt-draft" data-id="${esc(i.id)}">${esc(t('Generate draft'))}</button>` : s.status === 'Published' ? `<button class="btn small" data-act="stmt-open" data-id="${esc(i.id)}">${esc(t('View'))}</button> <a class="btn small" href="#/investor/${esc(i.id)}" style="text-decoration:none;display:inline-block">${esc(t('Investor view'))}</a>` : `<button class="btn small primary" data-act="stmt-open" data-id="${esc(i.id)}">${esc(s.status === 'Draft' ? t('Review draft') : t('Review and decide'))}</button>`;
        return `<tr><td><strong>${esc(i.name)}</strong><div class="muted small">${esc(i.type)}</div></td><td>${Object.keys(i.holdings).length} ${esc(t('assets'))}</td><td class="num">${esc(money(snap.income))}</td><td class="num">${esc(money(snap.noi))}</td><td>${s ? pill(t(s.status), statusKind(s.status)) : pill(t('Not started'), 'neutral')}</td><td>${act}</td></tr>`; }).join('')}</tbody></table></div>
      <p class="small muted" style="margin-top:8px">${esc(t('Shares are pro-rata by recorded ownership percentage (sample methodology). Figures are internal until a statement is approved and published.'))}</p></section>`;
  }

  async function openStatement(investorId) {
    const invs = await Store.getInvestors(), inv = invs.find(i => i.id === investorId); let s = inv.statements.find(x => x.period === S.periodId);
    if (!s) { s = await Store.prepareStatement(investorId, S.periodId, S.role); toast(t('Draft generated from sample data.')); await render(); const fresh = (await Store.getInvestors()).find(i => i.id === investorId); s = fresh.statements.find(x => x.period === S.periodId); }
    const body = `<p class="muted small">${esc(inv.name)} · ${esc(periodLabel(s.period))} · ${pill(t(s.status), statusKind(s.status))} · ${esc(t('Prepared by'))} ${esc(t(s.preparedBy))}</p>${stmtTable(s.snapshot)}
      ${s.notes && s.notes.length ? `<div class="notice warn" style="margin-top:10px"><strong>${esc(t('Data notes'))}</strong><ul style="margin:6px 0 0;padding-inline-start:18px">${s.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>` : `<p class="small muted" style="margin-top:10px">${esc(t('No data notes for this statement.'))}</p>`}
      ${s.status === 'Draft' ? `<label style="display:flex;gap:8px;align-items:flex-start;margin-top:12px"><input type="checkbox" id="ack"> <span>${esc(t('I have reviewed the figures and data notes above. A human review is required before anything reaches an investor.'))}</span></label>` : ''}`;
    const acts = [];
    if (s.status === 'Draft') acts.push({ label: t('Submit for review'), primary: true, onClick: async () => { await Store.submitStatement(s.id, S.role, $('ack').checked); dlg.close(); toast(t('Submitted for review.')); await render(); } });
    if (s.status === 'In review') {
      const can = S.role === 'Approver', why = t('Switch the demo role to Approver (and not the person who prepared it).');
      acts.push({ label: t('Return to draft'), onClick: async () => { await Store.decideStatement(s.id, 'return', S.role); dlg.close(); toast(t('Returned to draft.')); await render(); }, disabled: !can, why });
      acts.push({ label: t('Approve and publish to investor view'), primary: true, onClick: async () => { await Store.decideStatement(s.id, 'approve', S.role); dlg.close(); toast(t('Approved and published (audit entry recorded).')); await render(); }, disabled: !can, why });
    }
    openDialog(t('Investor statement'), body, acts);
  }
  const stmtTable = sn => `<div class="tblwrap"><table><thead><tr><th>${esc(t('Asset'))}</th><th class="num">${esc(t('Ownership'))}</th><th class="num">${esc(t('Income'))}</th><th class="num">${esc(t('Operating costs'))}</th><th class="num">NOI</th><th class="num">${esc(t('Value share'))}</th></tr></thead><tbody>${sn.rows.map(r => `<tr><td>${esc(r.name)}</td><td class="num">${esc(pct(r.share, 0))}</td><td class="num">${esc(money(r.income))}</td><td class="num">${esc(money(r.opex))}</td><td class="num">${esc(money(r.noi))}</td><td class="num">${r.valueShare == null ? 'n/a' : `${esc(money(r.valueShare))}<div class="muted small">${esc(date(r.valuationDate))}</div>`}</td></tr>`).join('')}<tr><th>${esc(t('Total'))}</th><th></th><th class="num">${esc(money(sn.income))}</th><th class="num">${esc(money(sn.opex))}</th><th class="num">${esc(money(sn.noi))}</th><th class="num">${esc(money(sn.valueShare))}</th></tr></tbody></table></div><p class="small muted" style="margin-top:6px">${esc(t('Share = asset figure × ownership %. Value share uses each asset’s latest valuation on file (dates shown); assets without one are excluded.'))} ${esc(S.cfg.currency)}.</p>`;

  async function viewInvestorWorkspace(id) {
    const only = S.mode === 'investor';
    const invs = only ? [] : await Store.getInvestors(), w = await Store.getInvestorWorkspace(id), latest = w.statements[0];
    if (only && w.config) S.cfg = { ...S.cfg, ...w.config };
    // The switcher is demo chrome (an operator tool), kept inside the band and outside the investor's own content.
    const sw = only ? '' : `<label class="demo-ctrl">${esc(t('Demo control, not part of the investor’s view'))}: ${esc(t('View as investor'))} <select data-bind="investor" data-demo-chrome>${invs.map(i => `<option value="${esc(i.id)}"${i.id === id ? ' selected' : ''}>${esc(i.name)}</option>`).join('')}</select></label>`;
    const note = only ? t('Your access is limited by the server to your own approved statements and documents.') : (S.mode === 'connected' ? t('Server-built preview of exactly what this investor receives. An investor account sees only this, enforced by the server.') : t('Visual demonstration of what one investor might see. Filtering here is done in the browser; real access control must be enforced by a server.'));
    return `<div class="inv-band" data-demo-chrome><strong>${esc(t('INVESTOR VIEW'))}</strong><span>${esc(note)}</span>${sw}${only ? '' : `<a href="#/overview" style="color:#fff;margin-inline-start:auto">${esc(t('Back to operator view'))}</a>`}</div><div id="investor-content">` +
      head(w.investor.name, `${esc(w.investor.type)} · ${sample()}`) +
      (latest ? `<div class="grid kpis"><div class="card kpi"><div class="label">${esc(t('Latest approved period'))}</div><div class="value" style="font-size:18px">${esc(latest.periodLabel)}</div><div class="note">${esc(t('Only approved statements are shown here.'))}</div></div>
        <div class="card kpi"><div class="label">${esc(t('Your share of income'))}</div><div class="value">${esc(money(latest.snapshot.income, true))}</div><div class="note">${esc(latest.periodLabel)}</div></div>
        <div class="card kpi"><div class="label">${esc(t('Your share of NOI'))}</div><div class="value">${esc(money(latest.snapshot.noi, true))}</div><div class="note">${esc(latest.periodLabel)}</div></div>
        <div class="card kpi"><div class="label">${esc(t('Value share (latest valuations)'))}</div><div class="value">${esc(money(latest.snapshot.valueShare, true))}</div><div class="note">${latest.snapshot.missingValuation.length ? esc(t('Excludes assets with no valuation on file')) : esc(t('All holdings valued'))}</div></div></div>` : empty(t('No approved statements yet.'))) +
      `<div class="grid cols2e" style="margin-top:14px"><section class="card" style="grid-column:1/-1"><header><h2>${esc(t('Your holdings'))}</h2></header><div class="tblwrap"><table><thead><tr><th>${esc(t('Asset'))}</th><th>${esc(t('Type'))}</th><th>${esc(t('Location'))}</th><th class="num">${esc(t('Ownership'))}</th></tr></thead><tbody>${w.holdings.map(h => `<tr><td>${esc(h.name)}</td><td>${esc(h.type)}</td><td>${esc(h.location)}</td><td class="num">${esc(pct(h.share, 0))}</td></tr>`).join('')}</tbody></table></div></section>
        <section class="card"><header><h2>${esc(t('Statements'))}</h2></header>${w.statements.length ? `<ul class="list">${w.statements.map(s => `<li><div><div class="t">${esc(s.periodLabel)}</div><div class="d">${esc(t('Approved and published'))}</div></div><button class="btn small" data-act="inv-stmt" data-id="${esc(s.id)}" data-inv="${esc(id)}">${esc(t('Open'))}</button></li>`).join('')}</ul>` : empty(t('None published.'))}</section>
        <section class="card"><header><h2>${esc(t('Documents'))}</h2></header>${w.documents.length ? `<ul class="list">${w.documents.map(d => `<li><div><div class="t">${esc(d.name)}</div><div class="d">${esc(d.type)} · ${esc(date(d.date))}</div></div>${pill(t('Approved'), 'good')}</li>`).join('')}</ul><p class="small muted" style="margin-top:6px">${esc(t('Sample records only: no files are stored.'))}</p>` : empty(t('No approved documents.'))}</section>
        <section class="card"><header><h2>${esc(t('Communication history'))}</h2></header>${w.communications.length ? `<ul class="list">${w.communications.map(c => `<li><div><div class="t">${esc(c.subject)}</div><div class="d">${esc(c.direction)}</div></div><span class="muted small">${esc(date(c.at))}</span></li>`).join('')}</ul>` : empty(t('No messages.'))}</section></div>
      <p class="small muted" style="margin-top:14px">${esc(t('Not shown to investors: internal notes, draft or unapproved statements, other investors’ information.'))}</p></div>`;
  }

  async function viewRecords(tab) {
    tab = ['documents', 'tasks', 'approvals', 'audit'].includes(tab) ? tab : 'documents';
    const [docs, tasks, audit, invs] = await Promise.all([Store.getDocuments(), Store.getTasks(), Store.getAudit(), Store.getInvestors()]);
    const nav = `<nav class="tabs" aria-label="${esc(t('Records sections'))}">${[['documents', 'Documents'], ['tasks', 'Tasks'], ['approvals', 'Approvals'], ['audit', 'Audit history']].map(([k, l]) => `<a href="#/records?tab=${k}"${k === tab ? ' aria-current="page"' : ''}>${esc(t(l))}</a>`).join('')}</nav>`;
    let body = '';
    if (tab === 'documents') { const f = S.docFilter, list = docs.filter(d => !f || d.status === f);
      body = `<section class="card"><header><h2>${esc(t('Documents and records'))}</h2><div class="ctrls"><label class="ctrl">${esc(t('Status'))}<select data-bind="docfilter"><option value="">${esc(t('All'))}</option>${['Approved', 'Pending review', 'Missing', 'Expired', 'Rejected'].map(x => `<option value="${x}"${f === x ? ' selected' : ''}>${esc(t(x))}</option>`).join('')}</select></label></div></header>${docTable(list)}<p class="small muted" style="margin-top:8px">${esc(t('Sample records only: no files are stored and nothing here is secured or enforced by a backend.'))}</p></section>`; }
    else if (tab === 'tasks') body = `<section class="card"><header><h2>${esc(t('Tasks'))}</h2>${sample()}</header>${taskTable(tasks)}</section>`;
    else if (tab === 'approvals') {
      const pend = docs.filter(d => d.status === 'Pending review'), inrev = invs.flatMap(i => i.statements.filter(s => s.status === 'In review').map(s => ({ i, s })));
      body = `<div class="notice info" style="margin-bottom:14px">${esc(t('Demo role'))}: <strong>${esc(t(S.role))}</strong>. ${esc(t('Only the Approver role can approve. This is a visual demonstration, not enforced permissions.'))}</div>
        <div class="grid cols2e"><section class="card"><header><h2>${esc(t('Documents awaiting review'))}</h2></header>${pend.length ? docTable(pend, true) : empty(t('Nothing waiting.'))}</section>
        <section class="card"><header><h2>${esc(t('Statements awaiting approval'))}</h2></header>${inrev.length ? `<ul class="list">${inrev.map(({ i, s }) => `<li><div><div class="t">${esc(i.name)}</div><div class="d">${esc(periodLabel(s.period))} · ${esc(t('Prepared by'))} ${esc(t(s.preparedBy))}</div></div><button class="btn small primary" data-act="stmt-open" data-id="${esc(i.id)}" data-period="${esc(s.period)}">${esc(t('Review'))}</button></li>`).join('')}</ul>` : empty(t('Nothing waiting. Prepare a statement under Investors.'))}</section></div>`;
    } else body = `<section class="card"><header><h2>${esc(t('Audit history'))}</h2>${sample()}</header>${auditTable(audit)}<p class="small muted" style="margin-top:8px">${esc(t('Entries marked “this session” were created by your actions in this demo and are lost on reload. A real audit trail needs server-side, tamper-evident storage.'))}</p></section>`;
    return head(t('Documents, tasks, approvals and audit'), `${esc(t('Operational records'))} · ${esc(t('sample data'))}`) + nav + body;
  }

  async function viewAssistant() {
    return head(t('Assistant (simulated)'), esc(t('Rule-based answers from the sample records. Not an AI model.')), periodSelect()) +
      `<div class="notice warn" style="margin-bottom:14px"><strong>${esc(t('Simulated assistant'))}</strong>: ${esc(t('No AI model and no network call is involved. Answers use only the sample data, list the records they used, separate facts from rule-based inferences and name gaps. It does not give investment advice or forecasts. Valuations, investor communications, approvals and decisions need human review.'))}</div>
      <section class="card"><div class="chips" role="group" aria-label="${esc(t('Suggested questions'))}">${Asst.suggestions.map(q => `<button class="chip" data-act="ask" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
      <form id="ask-form" style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><label class="sr-only" for="ask-q">${esc(t('Your question'))}</label><input type="text" id="ask-q" style="flex:1;min-width:220px" placeholder="${esc(t('Ask about the sample portfolio…'))}" maxlength="300"><button class="btn primary" type="submit">${esc(t('Ask'))}</button></form>
      <div id="answers" aria-live="polite">${S.answers.map(answerHtml).join('')}</div></section>`;
  }
  const answerHtml = a => `<div class="answer"><div class="q">${esc(a.question)}</div>${a.refused ? `<div class="notice bad" style="margin-bottom:8px">${esc(t('Not answered: advice, valuation opinions and forecasts are out of scope.'))}</div>` : ''}<ul>${a.summary.map(s => `<li><span class="kind ${s.type}">${esc(s.type === 'fact' ? t('FACT') : t('INFERENCE'))}</span>${esc(s.text)}</li>`).join('')}</ul>${a.gaps.length ? `<div class="notice warn" style="margin-top:8px"><strong>${esc(t('Gaps'))}</strong><ul style="margin:4px 0 0;padding-inline-start:18px">${a.gaps.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>` : ''}${a.sources.length ? `<div class="srcs"><strong>${esc(t('Based on'))}:</strong> ${a.sources.map(s => `<a href="${esc(s.href)}">${esc(s.label)}</a>`).join(' · ')}</div>` : ''}<p class="small muted" style="margin-top:8px">${esc(t('Simulated, rule-based answer. Human review is required before acting.'))}</p></div>`;

  async function viewSettings() {
    const conn = S.mode === 'connected', lock = conn && S.role !== 'Approver' ? ' disabled' : '';
    const cur = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'AUD'], loc = [['en-US', 'English (US)'], ['en-GB', 'English (UK)'], ['de-DE', 'Deutsch'], ['fr-FR', 'Français'], ['ar-AE', 'العربية (AE)'], ['ar-SA', 'العربية (SA)']];
    return head(t('Settings and configuration'), esc(t('Sample configuration for the demonstration; not assumptions about any real organisation.'))) +
      `<div class="grid cols2e"><section class="card"><header><h2>${esc(t('Presentation'))}</h2></header><div class="ctrls" style="flex-direction:column;align-items:stretch">
        <label class="ctrl">${esc(t('Currency label of the sample data'))}<select data-bind="currency"${lock}>${cur.map(c => `<option${c === S.cfg.currency ? ' selected' : ''}>${c}</option>`).join('')}</select></label>
        <p class="small muted">${esc(t('Relabels the unit only. The sample values are not converted between currencies.'))}</p>
        <label class="ctrl">${esc(t('Number and date format'))}<select data-bind="locale"${lock}>${loc.map(([v, l]) => `<option value="${v}"${v === S.cfg.locale ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
        <label class="ctrl">${esc(t('Target NOI yield on cost (%)'))}<input type="number" step="0.1" min="0" max="30" value="${(S.cfg.targetYield * 100).toFixed(1)}" data-bind="target"${lock}></label>
        ${conn ? `<p class="small muted">${esc(lock ? t('Only an Approver can change these; they apply to the whole agency.') : t('These settings are saved for the whole agency.'))}</p>` : ''}
        <label class="ctrl">${esc(t('Theme'))}<select data-bind="theme"><option value="system"${S.theme === 'system' ? ' selected' : ''}>${esc(t('System'))}</option><option value="light"${S.theme === 'light' ? ' selected' : ''}>${esc(t('Light'))}</option><option value="dark"${S.theme === 'dark' ? ' selected' : ''}>${esc(t('Dark'))}</option></select></label>
        <div class="seg" role="group" aria-label="${esc(t('Language'))}"><button data-act="lang" data-l="en" aria-pressed="${I.lang === 'en'}">English</button><button data-act="lang" data-l="ar" aria-pressed="${I.lang === 'ar'}">العربية</button></div>
        <p class="small muted">${esc(t('Arabic covers interface text. Sample record names, assistant answers and exception sentences remain in English.'))}</p></div></section>
        <section class="card"><header><h2>${esc(t('Data connections'))}</h2></header><ul class="list">${[...(conn ? [['Observer backend', 'Agency database, roles and audit enforced by the server']] : []), ['General ledger / accounting', conn ? 'Sample data stored in the database' : 'Sample extract in the page'], ['Valuation provider', 'Sample records'], ['Document store', 'Sample records, no files'], ['Identity and permissions', 'Visual demo roles only'], ['Lead engagement (voice) module', 'Separate scripted simulation']].map(([n, d]) => `<li><div><div class="t">${esc(t(n))}</div><div class="d">${esc(t(d))}</div></div>${n === 'Observer backend' ? pill(t('Connected'), 'good') : pill(t('Not connected'), 'neutral')}</li>`).join('')}</ul>
        ${conn ? '' : `<div style="margin-top:12px"><button class="btn" data-act="reset">${esc(t('Reset demo data'))}</button> <span class="small muted">${esc(t('Clears this session’s changes.'))}</span></div>`}</section></div>
      <details class="method" style="margin-top:14px"><summary>${esc(t('About this prototype'))}</summary><p class="small" style="margin-top:8px">${esc(t('Concept prototype with fictional data. Not a production platform and not connected to any real system. What is simulated, what is missing and what a production build needs is documented in IMPLEMENTATION_NOTES.md.'))}</p></details>`;
  }

  // ── shell ──
  function renderShell(r) {
    const inv = r.route === 'investor', invOnly = S.mode === 'investor', conn = S.mode === 'connected' || S.mode === 'connected-empty';
    document.body.classList.toggle('investor-mode', inv);
    $('skip').textContent = t('Skip to content');
    $('banner').innerHTML = invOnly
      ? `<strong>${esc(t('Investor access'))}</strong><span>${esc(t('You can see only your own approved statements and documents. This is enforced by the server. Fictional sample data.'))}</span><a href="#" data-act="signout">${esc(t('Sign out'))}</a>`
      : conn
        ? `<strong>${esc(t('Concept prototype — sample data'))}</strong><span>${esc(t('Connected mode: fictional sample data stored in your agency’s Observer database. Roles and investor access are enforced by the server.'))}</span><a href="voice.html">${esc(t('Lead engagement module (optional, separate)'))}</a>`
        : `<strong>${esc(t('Concept prototype — sample data'))}</strong><span>${esc(t('Fictional assets, figures and people. Not connected to any production system. Nothing is saved.'))}</span><a href="voice.html">${esc(t('Lead engagement module (optional, separate)'))}</a>`;
    const nav = [['overview', 'Overview'], ['assets', 'Assets'], ['performance', 'Performance'], ['investors', 'Investors'], ['records', 'Records'], ['assistant', 'Assistant (simulated)'], ['settings', 'Settings']];
    const chip = invOnly ? `${esc(S.me.email)}` : conn ? `${esc(t('Connected'))}: ${esc(S.me.agency || '')}` : esc(t('Standalone sample (nothing saved)'));
    const account = invOnly ? '' : conn
      ? `<span class="small">${esc(S.me.email)} · <strong>${esc(t(S.role))}</strong></span><span class="small">${esc(t('Role enforced by the server.'))}</span><button class="btn small" data-act="signout" style="margin-top:6px">${esc(t('Sign out'))}</button>`
      : `<label class="ctrl">${esc(t('Demo role'))}<select data-bind="role"><option value="Analyst"${S.role === 'Analyst' ? ' selected' : ''}>${esc(t('Analyst'))}</option><option value="Approver"${S.role === 'Approver' ? ' selected' : ''}>${esc(t('Approver'))}</option></select></label><span class="small">${esc(t('Visual only: not enforced.'))}</span>`;
    $('side').innerHTML = `<div class="brand"><b>${esc(t('Portfolio & Investor Operations'))}</b><span>${esc(t('Concept prototype'))}</span><span class="small" style="display:block;margin-top:4px">${chip}</span></div>
      <nav class="nav" aria-label="${esc(t('Primary'))}">${invOnly ? `<a href="#/investor/${esc(S.me.investorId)}" aria-current="page">${esc(t('My portfolio'))}</a>` : inv ? `<a href="#/investor/${esc(r.id || '')}" aria-current="page">${esc(t('My portfolio'))}</a><a href="#/overview">${esc(t('Back to operator view'))}</a>` : (S.mode === 'signin' || S.mode === 'connected-empty') ? '' : nav.map(([k, l]) => `<a href="#/${k}"${k === r.route ? ' aria-current="page"' : ''}>${esc(t(l))}</a>`).join('')}</nav>
      <div class="sep"></div><div class="opt">${account}
      <div class="seg" style="margin-top:8px" role="group" aria-label="${esc(t('Language'))}"><button data-act="lang" data-l="en" aria-pressed="${I.lang === 'en'}">EN</button><button data-act="lang" data-l="ar" aria-pressed="${I.lang === 'ar'}">AR</button></div>
      ${invOnly ? '' : `<a href="voice.html">${esc(t('Lead engagement module (optional, separate)'))}</a>`}${conn ? `<a href="../platform.html">${esc(t('Open the lead workspace'))}</a>` : ''}</div>`;
  }

  let renderId = 0;
  async function render() {
    const my = ++renderId, r = parse(), main = $('main');
    if (S.mode === 'investor') { r.route = 'investor'; r.id = S.me.investorId; }
    renderShell(r);
    try {
      let html;
      if (S.mode === 'connected') { await Store.sync(); S.cfg = await Store.getConfig(); S.portfolios = await Store.getPortfolios(); }
      if (S.mode === 'signin') html = viewSignin();
      else if (S.mode === 'connected-empty') html = viewEmptyConnected();
      else if (r.route === 'overview') html = await viewOverview();
      else if (r.route === 'assets') html = r.id ? await viewAsset(r.id, r.q.tab) : await viewAssets();
      else if (r.route === 'performance') html = await viewPerformance();
      else if (r.route === 'investors') html = await viewInvestors();
      else if (r.route === 'investor') html = await viewInvestorWorkspace(r.id || 'INV-01');
      else if (r.route === 'records') html = await viewRecords(r.q.tab);
      else if (r.route === 'assistant') html = await viewAssistant();
      else if (r.route === 'settings') html = await viewSettings();
      else html = `<div class="empty">${esc(t('Page not found.'))} <a href="#/overview">${esc(t('Go to overview'))}</a></div>`;
      if (my !== renderId) return;
      main.innerHTML = html;
      document.title = `${t('Portfolio & Investor Operations')} — ${t('concept prototype')}`;
      if (r.route === 'assets' && !r.id) fillAssetTable();
      if (r.route === 'assets' && !r.id && S.focusSearch) { const q = $('f-q'); if (q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); } S.focusSearch = false; }
    } catch (e) {
      if (my !== renderId) return;
      main.innerHTML = `<div class="notice bad"><strong>${esc(t('Could not load this view.'))}</strong> ${esc(e.message)} <button class="btn small" data-act="retry">${esc(t('Retry'))}</button></div>`;
    }
  }

  function viewSignin() {
    return `<section class="card" style="max-width:640px"><h1>${esc(t('Portfolio & Investor Operations'))}</h1>
      <p style="margin:10px 0">${esc(t('This page is served by an Observer server. Sign in to use connected mode (data stored per agency, roles and investor access enforced by the server), or continue with the local sample (nothing saved).'))}</p>
      <p class="ctrls"><a class="btn primary" style="text-decoration:none;display:inline-block" href="/login.html?next=/demo/index.html">${esc(t('Sign in'))}</a><button class="btn" data-act="standalone">${esc(t('Continue with the local sample'))}</button></p></section>`;
  }
  function viewEmptyConnected() {
    const admin = S.me.role === 'admin';
    return `<section class="card" style="max-width:640px"><h1>${esc(t('No portfolio data yet'))}</h1>
      <p style="margin:10px 0">${esc(t('This agency has no portfolio records. Loading the sample adds the fictional demonstration portfolio to this agency’s database.'))}</p>
      ${admin ? `<button class="btn primary" data-act="load-sample">${esc(t('Load the sample portfolio'))}</button>` : `<div class="notice info">${esc(t('Ask an admin to load the sample portfolio.'))}</div>`}
      <p class="small muted" style="margin-top:10px"><button class="btn small" data-act="standalone">${esc(t('Use the local sample instead'))}</button></p></section>`;
  }

  function openAssetDialog() {
    const f = (id, label, input) => `<label class="ctrl" style="margin-bottom:8px">${esc(label)}${input}</label>`;
    openDialog(t('Add asset'), `<p class="small muted" style="margin-bottom:10px">${esc(t('Creates an asset with no valuation. Missing required records are flagged automatically.'))}</p>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0 12px">
      ${f('n', t('Name'), '<input type="text" id="na-name" maxlength="120">')}${f('t', t('Type'), '<input type="text" id="na-type" maxlength="60" placeholder="Office">')}
      ${f('p', t('Portfolio'), `<select id="na-port">${S.portfolios.map(x => `<option value="${esc(x.id)}">${esc(x.name)}</option>`).join('')}</select>`)}${f('l', t('Location'), '<input type="text" id="na-loc" maxlength="120">')}
      ${f('s', t('Status'), '<select id="na-status"><option>Stabilised</option><option>Lease-up</option><option>Refurbishment</option><option>Held for sale</option></select>')}${f('a', t('Acquired'), '<input type="date" id="na-acq">')}
      ${f('c', t('Acquisition cost'), '<input type="number" id="na-cost" min="1" step="1">')}${f('cap', t('Capacity'), '<input type="number" id="na-cap" min="0" step="1" value="0">')}
      ${f('u', t('Unit'), '<select id="na-unit"><option value="units">units</option><option value="sqm">sqm</option></select>')}${f('g', t('Gross potential rent per month'), '<input type="number" id="na-gpr" min="0" step="1" value="0">')}
      ${f('o', t('Other income per month'), '<input type="number" id="na-other" min="0" step="1" value="0">')}${f('m', t('Operating costs per month'), '<input type="number" id="na-opex" min="0" step="1" value="0">')}
      ${f('oc', t('Typical occupancy (%) applied to every month'), '<input type="number" id="na-occ" min="0" max="100" step="1" value="0">')}</div>`,
      [{ label: t('Create asset'), primary: true, onClick: async () => {
        const v = id => $(id).value, occ = Math.min(100, Math.max(0, Number(v('na-occ')) || 0)) / 100;
        await Store.createAsset({ name: v('na-name'), type: v('na-type'), portfolio: v('na-port'), location: v('na-loc'), status: v('na-status'), acquired: v('na-acq'), cost: Number(v('na-cost')), capacity: Number(v('na-cap')), unit: v('na-unit'), gpr: Number(v('na-gpr')), other: Number(v('na-other')), opex: { maintenance: Number(v('na-opex')) }, occupancy: Array(12).fill(occ) });
        dlg.close(); toast(t('Asset created and recorded in the audit history.')); await render();
      } }]);
  }
  function openValuationDialog(id) {
    openDialog(t('Record valuation'), `<p class="small muted" style="margin-bottom:10px">${esc(t('A valuation needs a value, an as-at date and a named source. It is recorded in the audit history.'))}</p>
      <label class="ctrl" style="margin-bottom:8px">${esc(t('Value'))}<input type="number" id="nv-val" min="1" step="1"></label><label class="ctrl" style="margin-bottom:8px">${esc(t('As at'))}<input type="date" id="nv-date"></label><label class="ctrl">${esc(t('Source'))}<input type="text" id="nv-src" maxlength="120" placeholder="Independent appraisal"></label>`,
      [{ label: t('Save valuation'), primary: true, onClick: async () => { await Store.recordValuation(id, { value: Number($('nv-val').value), date: $('nv-date').value, source: $('nv-src').value }); dlg.close(); toast(t('Valuation recorded.')); await render(); } }]);
  }

  // ── events ──
  document.addEventListener('change', async e => { try { await onChange(e); } catch (err) { toast(err.message, true); await render(); } });
  async function onChange(e) {
    const el = e.target, b = el.dataset && el.dataset.bind;
    if (el.id === 'f-type') { S.filter.type = el.value; return fillAssetTable(); }
    if (el.id === 'f-status') { S.filter.status = el.value; return fillAssetTable(); }
    if (el.id === 'f-ex') { S.filter.exceptionsOnly = el.checked; return fillAssetTable(); }
    if (!b) return;
    if (b === 'period') S.periodId = el.value;
    else if (b === 'portfolio') S.portfolio = el.value;
    else if (b === 'role') S.role = el.value;
    else if (b === 'docfilter') S.docFilter = el.value;
    else if (b === 'investor') { location.hash = '#/investor/' + el.value; return; }
    else if (b === 'currency') { S.cfg = await Store.setConfig({ currency: el.value }); }
    else if (b === 'locale') { S.cfg = await Store.setConfig({ locale: el.value }); }
    else if (b === 'target') { const v = parseFloat(el.value); if (isFinite(v) && v >= 0 && v <= 30) S.cfg = await Store.setConfig({ targetYield: v / 100 }); }
    else if (b === 'theme') { S.theme = el.value; if (el.value === 'system') document.documentElement.removeAttribute('data-theme'); else document.documentElement.dataset.theme = el.value; }
    render();
  }
  document.addEventListener('input', e => { if (e.target.id === 'f-q') { S.filter.q = e.target.value; fillAssetTable(); } });
  document.addEventListener('submit', async e => {
    if (e.target.id !== 'ask-form') return; e.preventDefault(); await ask($('ask-q').value);
  });
  async function ask(q) {
    const ctx = { periodId: S.periodId, currency: S.cfg.currency, cfg: S.cfg };
    S.answers.unshift(await Asst.answer(q, ctx)); S.answers = S.answers.slice(0, 8);
    const box = $('answers'); if (box) box.innerHTML = S.answers.map(answerHtml).join(''); const inp = $('ask-q'); if (inp) { inp.value = ''; inp.focus(); }
  }
  document.addEventListener('click', async e => {
    const row = e.target.closest('tr[data-href]'); if (row && !e.target.closest('a,button')) { location.hash = row.dataset.href; return; }
    const el = e.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act;
    try {
      if (act === 'lang') { I.set(el.dataset.l); await render(); }
      else if (act === 'retry') await render();
      else if (act === 'signout') await Store.signOut();
      else if (act === 'standalone') { Store.useStandalone(); S.mode = 'standalone'; S.me = null; S.cfg = await Store.getConfig(); S.periods = await Store.getPeriods(); S.portfolios = await Store.getPortfolios(); location.hash = '#/overview'; await render(); }
      else if (act === 'load-sample') { await Store.loadSample(); S.mode = 'connected'; S.cfg = await Store.getConfig(); S.periods = await Store.getPeriods(); S.portfolios = await Store.getPortfolios(); toast(t('Sample portfolio loaded.')); location.hash = '#/overview'; await render(); }
      else if (act === 'add-asset') openAssetDialog();
      else if (act === 'valuation') openValuationDialog(el.dataset.id);
      else if (act === 'ask') await ask(el.dataset.q);
      else if (act === 'task') { await Store.toggleTask(el.dataset.id, S.role); toast(t('Task updated and recorded in the audit history.')); await render(); }
      else if (act === 'doc') { await Store.reviewDocument(el.dataset.id, el.dataset.d, S.role); toast(t('Document review recorded in the audit history.')); await render(); }
      else if (act === 'stmt-draft' || act === 'stmt-open') { if (el.dataset.period) S.periodId = el.dataset.period; await openStatement(el.dataset.id); }
      else if (act === 'inv-stmt') { const w = await Store.getInvestorWorkspace(el.dataset.inv), s = w.statements.find(x => x.id === el.dataset.id); openDialog(`${t('Statement')} — ${s.periodLabel}`, stmtTable(s.snapshot) + (s.notes.length ? `<div class="notice warn" style="margin-top:10px"><ul style="margin:0;padding-inline-start:18px">${s.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>` : '')); }
      else if (act === 'reset') { await Store.reset(); S.answers = []; toast(t('Demo data reset.')); await render(); }
      else if (act === 'csv-asset') { const d = await Store.getAsset(el.dataset.id, S.periodId); csvDownload(`${d.asset.id}-monthly-${S.cfg.currency}.csv`, [['Month', 'Occupancy', 'Rental income', 'Other income', 'Total income', 'Operating costs', 'NOI', 'Currency', 'Source'], ...d.monthly.map(m => [m.month, m.occ, m.rental, m.other, m.income, m.opex, m.noi, S.cfg.currency, S.cfg.financialsSource])]); }
      else if (act === 'csv-perf') { const as = await Store.getAssets({ portfolio: S.portfolio }, S.periodId); csvDownload(`performance-${S.periodId}-${S.cfg.currency}.csv`, [['Asset', 'Period', 'Income', 'Operating costs', 'NOI', 'Occupancy', 'Yield on cost', 'Yield on value', 'Target yield', 'Currency', 'Source'], ...as.map(a => [a.name, S.periodId, a.period.income, a.period.opex, a.period.noi, a.period.occupancy.toFixed(4), a.period.yieldOnCost.toFixed(4), a.period.yieldOnValue == null ? '' : a.period.yieldOnValue.toFixed(4), a.period.target, S.cfg.currency, S.cfg.financialsSource])]); }
    } catch (err) { toast(err.message, true); }
  });
  window.addEventListener('hashchange', () => { render(); $('main').focus({ preventScroll: true }); window.scrollTo(0, 0); });

  (async function init() {
    try {
      const st = await Store.init();
      S.mode = st.mode; S.me = st.me || null;
      if (S.mode === 'connected' || S.mode === 'connected-empty') S.role = S.me.label || (S.me.role === 'admin' ? 'Approver' : 'Analyst');
      if (S.mode === 'investor') S.cfg = { currency: 'USD', locale: 'en-US', thresholds: {} };
      else { S.cfg = await Store.getConfig(); S.periods = await Store.getPeriods(); S.portfolios = await Store.getPortfolios(); }
    } catch (e) { S.mode = 'standalone'; Store.useStandalone(); S.cfg = await Store.getConfig(); S.periods = await Store.getPeriods(); S.portfolios = await Store.getPortfolios(); }
    window.DemoI18n.register(window.DemoAR || {});
    if (!location.hash && S.mode !== 'investor') location.hash = '#/overview'; else render();
  })();
  window.DemoApp = { render };
})();
