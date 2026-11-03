/* Pure calculations. No DOM, no network, no randomness. Every figure shown in the UI comes from these functions,
   from the visible inputs in data.js. Formulas are repeated in the UI "Methodology" panels.
   Definitions (sample methodology, not an accounting standard):
     rental income   = gross potential rent x occupancy (rounded to a whole unit)
     total income    = rental income + other income
     opex            = sum of operating cost lines + one-off costs in that month (excludes capex, debt service, tax on income)
     NOI             = total income - opex
     annualised NOI  = period NOI x 12 / months in period
     yield on cost   = annualised NOI / acquisition cost
     yield on value  = annualised NOI / current valuation (n/a when no valuation is on file)
     rent-weighted occupancy = sum(gross potential rent x occupancy) / sum(gross potential rent)  */
(function (root) {
  const C = {};
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const day = iso => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  C.daysBetween = (fromIso, toIso) => Math.round((day(toIso) - day(fromIso)) / 864e5);
  C.period = (D, id) => D.periods.find(p => p.id === id);
  C.targetFor = (D, asset) => asset.targetYield ?? D.config.targetYield;
  C.opexLines = a => Object.values(a.opex).reduce((s, v) => s + v, 0);

  C.assetMonth = (D, a, m) => {
    const i = D.months.indexOf(m), occ = a.occ[i];
    const rental = Math.round(a.gpr * occ), other = a.other, income = rental + other;
    const opex = C.opexLines(a) + (a.oneOff[i] || 0);
    return { month: m, occ, gpr: a.gpr, rental, other, income, opex, noi: income - opex };
  };
  C.assetPeriod = (D, a, periodId) => {
    const p = C.period(D, periodId), rows = p.months.map(m => C.assetMonth(D, a, m));
    const income = sum(rows, r => r.income), opex = sum(rows, r => r.opex), noi = income - opex, factor = 12 / rows.length;
    return {
      assetId: a.id, periodId, months: rows.length, rows, income, opex, noi, annualNoi: noi * factor,
      occupancy: sum(rows, r => r.occ) / rows.length,
      yieldOnCost: (noi * factor) / a.cost,
      yieldOnValue: a.valuation ? (noi * factor) / a.valuation.value : null,
      target: C.targetFor(D, a),
    };
  };
  C.portfolioPeriod = (D, assets, periodId) => {
    const per = assets.map(a => C.assetPeriod(D, a, periodId));
    const income = sum(per, r => r.income), opex = sum(per, r => r.opex), noi = income - opex, factor = 12 / (per[0]?.months || 1);
    const cost = sum(assets, a => a.cost), valued = assets.filter(a => a.valuation);
    const gprTotal = sum(assets, a => a.gpr);
    return {
      periodId, assets: per, income, opex, noi, annualNoi: noi * factor, cost,
      value: sum(valued, a => a.valuation.value), valuedCount: valued.length, assetCount: assets.length,
      costOfValued: sum(valued, a => a.cost),
      occupancy: gprTotal ? sum(assets, (a, i) => a.gpr * per[assets.indexOf(a)].occupancy) / gprTotal : 0,
      yieldOnCost: cost ? (noi * factor) / cost : 0,
    };
  };
  // Variance of a figure vs the prior period; null when there is no comparable prior period.
  C.vsPrior = (D, assets, periodId) => {
    const p = C.period(D, periodId);
    if (!p.prior) return null;
    const cur = C.portfolioPeriod(D, assets, periodId), prev = C.portfolioPeriod(D, assets, p.prior);
    return { prior: p.prior, noiDelta: cur.noi - prev.noi, noiPct: prev.noi ? (cur.noi - prev.noi) / Math.abs(prev.noi) : null, incomeDelta: cur.income - prev.income, opexDelta: cur.opex - prev.opex, occDelta: cur.occupancy - prev.occupancy };
  };
  C.monthlyNoiSeries = (D, assets) => D.months.map(m => ({ month: m, noi: sum(assets, a => C.assetMonth(D, a, m).noi), income: sum(assets, a => C.assetMonth(D, a, m).income) }));

  // ── Exceptions: transparent rules, no scoring model. Each carries the rule and the evidence used. ──
  C.exceptions = (D, periodId) => {
    const T = D.config.thresholds, today = D.config.demoToday, out = [], sev = { high: 0, medium: 1, low: 2 };
    const push = (e) => out.push(e);
    const latest = D.months[D.months.length - 1];
    D.assets.forEach(a => {
      if (!a.valuation) push({ id: 'val-missing-' + a.id, severity: 'high', type: 'Missing data', assetId: a.id, title: `${a.name}: no valuation on file`, detail: 'Yield on value cannot be calculated. Portfolio value excludes this asset.', rule: 'Asset has no valuation record', evidence: [`asset ${a.id}`] });
      else {
        const age = C.daysBetween(a.valuation.date, today);
        if (age > T.valuationMaxAgeDays) push({ id: 'val-stale-' + a.id, severity: 'medium', type: 'Stale data', assetId: a.id, title: `${a.name}: valuation is ${age} days old`, detail: `Valuation dated ${a.valuation.date} (${a.valuation.source}).`, rule: `Valuation older than ${T.valuationMaxAgeDays} days at ${today}`, evidence: [`asset ${a.id} valuation date ${a.valuation.date}`] });
      }
      const m = C.assetMonth(D, a, latest);
      if (m.occ < T.occupancyMin) push({ id: 'occ-' + a.id, severity: a.status === 'Stabilised' ? 'medium' : 'low', type: 'Performance', assetId: a.id, title: `${a.name}: occupancy ${(m.occ * 100).toFixed(0)}% in the latest month`, detail: a.status === 'Stabilised' ? 'Below the configured occupancy threshold for a stabilised asset.' : `Status is ${a.status}; threshold shown for reference.`, rule: `Latest-month occupancy below ${(T.occupancyMin * 100).toFixed(0)}%`, evidence: [`asset ${a.id} ${latest} occupancy`] });
      const per = C.assetPeriod(D, a, periodId);
      if (per.target - per.yieldOnCost > T.yieldShortfall) push({ id: 'yield-' + a.id, severity: 'medium', type: 'Performance', assetId: a.id, title: `${a.name}: yield on cost ${(per.yieldOnCost * 100).toFixed(2)}% vs target ${(per.target * 100).toFixed(2)}%`, detail: `For the selected period (${periodId}), annualised.`, rule: `Yield on cost below target by more than ${(T.yieldShortfall * 100).toFixed(1)} percentage points`, evidence: [`asset ${a.id} NOI ${periodId}`] });
    });
    D.leases.forEach(l => {
      const d = C.daysBetween(today, l.end);
      if (d >= 0 && d <= T.leaseExpiryDays) push({ id: 'lease-' + l.assetId + '-' + l.end, severity: l.note === 'Anchor tenant' ? 'high' : 'medium', type: 'Lease event', assetId: l.assetId, title: `${D.assets.find(a => a.id === l.assetId).name}: lease expiry in ${d} days`, detail: `${l.tenant}, ${l.space}, ends ${l.end}.`, rule: `Lease ends within ${T.leaseExpiryDays} days of ${today}`, evidence: [`lease ${l.tenant}`] });
    });
    D.documents.filter(d => d.scope === 'asset').forEach(d => {
      const a = D.assets.find(x => x.id === d.ref);
      if (d.status === 'Expired') push({ id: 'doc-exp-' + d.id, severity: 'high', type: 'Record', assetId: d.ref, title: `${a.name}: ${d.type} expired`, detail: `${d.name}, expired ${d.expires}.`, rule: 'Document status Expired', evidence: [`document ${d.id}`] });
      else if (d.expires) { const left = C.daysBetween(today, d.expires); if (left >= 0 && left <= T.docExpiryDays) push({ id: 'doc-soon-' + d.id, severity: 'medium', type: 'Record', assetId: d.ref, title: `${a.name}: ${d.type} expires in ${left} days`, detail: `${d.name}, expires ${d.expires}.`, rule: `Document expires within ${T.docExpiryDays} days`, evidence: [`document ${d.id}`] }); }
      if (d.status === 'Pending review') push({ id: 'doc-rev-' + d.id, severity: 'low', type: 'Approval', assetId: d.ref, title: `${a.name}: ${d.type} awaiting review`, detail: `${d.name}; owner ${d.owner}, due ${d.due}.`, rule: 'Document status Pending review', evidence: [`document ${d.id}`] });
    });
    return out.sort((x, y) => sev[x.severity] - sev[y.severity] || x.id.localeCompare(y.id));
  };

  // ── Investor share of a period (pro-rata of asset figures by ownership %; sample methodology) ──
  C.investorPeriod = (D, inv, periodId) => {
    const rows = Object.entries(inv.holdings).map(([id, share]) => {
      const a = D.assets.find(x => x.id === id), p = C.assetPeriod(D, a, periodId);
      return { assetId: id, name: a.name, share, income: Math.round(p.income * share), opex: Math.round(p.opex * share), noi: Math.round(p.noi * share), valueShare: a.valuation ? Math.round(a.valuation.value * share) : null, valuationDate: a.valuation?.date || null, valuationSource: a.valuation?.source || null, costShare: Math.round(a.cost * share) };
    });
    return { investorId: inv.id, periodId, rows, income: sum(rows, r => r.income), opex: sum(rows, r => r.opex), noi: sum(rows, r => r.noi), valueShare: sum(rows.filter(r => r.valueShare != null), r => r.valueShare), missingValuation: rows.filter(r => r.valueShare == null).map(r => r.name), costShare: sum(rows, r => r.costShare) };
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = C; else root.DemoCalc = C;
})(typeof window !== 'undefined' ? window : globalThis);
