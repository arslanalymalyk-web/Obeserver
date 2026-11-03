// Independent re-computation of sample figures + data integrity checks. Run: node test/demo-calc.test.js
const assert = require('assert');
const D = require('../public/demo/js/data.js'), C = require('../public/demo/js/calc.js');
const A = id => D.assets.find(a => a.id === id);

// Hand-computed: Harbor Point, Sep 2026: occupancy .93 -> rental round(260000*.93)=241800; income 249800; opex 94000; NOI 155800
const m = C.assetMonth(D, A('A1'), '2026-09');
assert.deepEqual([m.rental, m.income, m.opex, m.noi], [241800, 249800, 94000, 155800]);
// Cedar Row one-off cost in Apr 2026 (index 6): occ .72 -> 90000 + 3000 = 93000; opex 47000 + 22000 = 69000; NOI 24000
assert.equal(C.assetMonth(D, A('A5'), '2026-04').noi, 24000);
// Quarter = sum of its months; annualisation x4; yield on cost
const q3 = C.assetPeriod(D, A('A1'), '2026-Q3'), months = ['2026-07', '2026-08', '2026-09'].map(x => C.assetMonth(D, A('A1'), x).noi);
assert.equal(q3.noi, months.reduce((s, x) => s + x, 0));
assert.equal(q3.annualNoi, q3.noi * 4);
assert.ok(Math.abs(q3.yieldOnCost - (q3.noi * 4) / 31000000) < 1e-12);
assert.ok(Math.abs(q3.yieldOnValue - (q3.noi * 4) / 34500000) < 1e-12);
// Missing valuation => yield on value is null, never 0 or NaN; portfolio value excludes it and says so
assert.equal(C.assetPeriod(D, A('A6'), '2026-Q3').yieldOnValue, null);
const all = C.portfolioPeriod(D, D.assets, '2026-Q3');
assert.equal(all.valuedCount, 7); assert.equal(all.assetCount, 8);
assert.equal(all.value, D.assets.filter(a => a.valuation).reduce((s, a) => s + a.valuation.value, 0));
// Portfolio totals equal the sum of assets, and portfolios partition the assets
assert.equal(all.noi, all.assets.reduce((s, a) => s + a.noi, 0));
const p1 = C.portfolioPeriod(D, D.assets.filter(a => a.portfolio === 'P1'), '2026-Q3'), p2 = C.portfolioPeriod(D, D.assets.filter(a => a.portfolio === 'P2'), '2026-Q3');
assert.equal(p1.noi + p2.noi, all.noi); assert.equal(p1.income + p2.income, all.income);
// Trailing 12 months = sum of monthly series; annualisation factor 1
const t12 = C.portfolioPeriod(D, D.assets, 'T12M'), series = C.monthlyNoiSeries(D, D.assets);
assert.equal(t12.noi, series.reduce((s, x) => s + x.noi, 0)); assert.equal(t12.annualNoi, t12.noi);
// Prior-period comparison
const vs = C.vsPrior(D, D.assets, '2026-Q3'); assert.equal(vs.prior, '2026-Q2');
assert.equal(vs.noiDelta, all.noi - C.portfolioPeriod(D, D.assets, '2026-Q2').noi);
assert.equal(C.vsPrior(D, D.assets, 'T12M'), null, 'no prior period must be reported as null, not 0');
assert.equal(C.vsPrior(D, D.assets, '2025-Q4'), null);
// Data integrity
for (const a of D.assets) { assert.equal(a.occ.length, 12, a.id); assert.ok(a.occ.every(o => o >= 0 && o <= 1)); assert.ok(D.portfolios.some(p => p.id === a.portfolio)); }
for (const inv of D.investors) for (const [id, s] of Object.entries(inv.holdings)) { assert.ok(A(id), id); assert.ok(s > 0 && s <= 1); }
for (const a of D.assets) assert.ok(D.investors.reduce((s, i) => s + (i.holdings[a.id] || 0), 0) <= 1.0000001, 'ownership over 100% for ' + a.id);
for (const id of ['P1', 'P2']) assert.ok(D.assets.some(a => a.portfolio === id));
for (const p of D.periods) { assert.ok(p.months.length > 0); if (p.prior) assert.ok(C.period(D, p.prior), p.prior); }
// Investor share is pro-rata and reconciles to the asset
const inv = D.investors[0], ip = C.investorPeriod(D, inv, '2026-Q3');
assert.equal(ip.rows.find(r => r.assetId === 'A1').noi, Math.round(C.assetPeriod(D, A('A1'), '2026-Q3').noi * 0.4));
assert.equal(ip.noi, ip.rows.reduce((s, r) => s + r.noi, 0));
assert.deepEqual(C.investorPeriod(D, D.investors[2], '2026-Q3').missingValuation, ['Atlas Business Centre'], 'missing valuation is surfaced');
// Exceptions: deterministic, explainable, and the expected ones exist
const ex = C.exceptions(D, '2026-Q3'), has = id => ex.some(e => e.id === id);
assert.deepEqual(ex.map(e => e.id), C.exceptions(D, '2026-Q3').map(e => e.id), 'deterministic');
assert.ok(ex.every(e => e.rule && e.evidence.length && e.title));
assert.ok(has('val-missing-A6') && has('val-stale-A2') && has('lease-A3-2026-12-15') && has('doc-exp-D4') && has('doc-soon-D5') && has('occ-A2'));
assert.ok(!has('val-stale-A1') && !has('lease-A2-2027-01-31'), 'no false positives outside thresholds');
assert.equal(C.daysBetween('2026-10-05', '2026-12-15'), 71);
console.log('demo calc tests passed (' + ex.length + ' exceptions for 2026-Q3)');
