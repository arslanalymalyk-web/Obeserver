// Portfolio backend tests against a real Postgres. Run: DATABASE_URL=postgres://... node test/portfolio.test.js
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'test-secret-test-secret-test-secret-123';
const assert = require('assert'), http = require('http');
const { handle } = require('../lib/router'), { close, db } = require('../lib/db');
const Calc = require('../public/demo/js/calc.js'), SAMPLE = require('../public/demo/js/data.js');
const srv = http.createServer(async (q, r) => { if (!(await handle(q, r))) r.writeHead(404).end(); });

async function main() {
  await new Promise(r => srv.listen(0, r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const mk = () => { let cookie = ''; return async (method, p, b, h = {}) => {
    const r = await fetch(base + p, { method, headers: { 'content-type': 'application/json', cookie, ...h }, body: b === undefined ? undefined : JSON.stringify(b) });
    const sc = r.headers.get('set-cookie'); if (sc) cookie = sc.split(';')[0];
    return { s: r.status, j: await r.json().catch(() => null) };
  }; };
  const tag = Date.now(), admin = mk(), other = mk(), anon = mk();
  const signup = (c, email, seed) => c('POST', '/api/auth/signup', { email, password: 'correct-horse-1', agency: 'Agency ' + email, seed_demo: seed });
  const invite = async (c, email, role, investor_id) => { const i = (await c('POST', '/api/users/invite', { email, role, investor_id })).j; return i; };
  const join = async (token) => { const c = mk(); const r = await c('POST', '/api/auth/accept', { token, password: 'invited-password-1' }); return { c, r }; };

  assert.equal((await anon('GET', '/api/portfolio/bootstrap')).s, 401, 'needs a session');
  assert.equal((await signup(admin, `p-admin${tag}@t.co`, true)).s, 201);
  assert.equal((await signup(other, `p-other${tag}@t.co`, false)).s, 201);

  // ── seeding and shape ──
  const boot = (await admin('GET', '/api/portfolio/bootstrap')).j;
  assert.equal(boot.empty, false); assert.equal(boot.assets.length, 8); assert.equal(boot.portfolios.length, 2); assert.equal(boot.investors.length, 3);
  assert.equal(boot.months.length, 12); assert.ok(boot.periods.find(p => p.id === '2026-Q3'));
  const a2 = boot.assets.find(a => a.id === 'A2'); assert.deepEqual(a2.valuation, SAMPLE.assets[1].valuation); assert.deepEqual(a2.occ, SAMPLE.assets[1].occ);
  assert.equal(boot.assets.find(a => a.id === 'A6').valuation, null, 'missing valuation stays null');
  // server data reproduces the same numbers as the browser calc on the sample
  assert.equal(Calc.portfolioPeriod(boot, boot.assets, '2026-Q3').noi, Calc.portfolioPeriod(SAMPLE, SAMPLE.assets, '2026-Q3').noi);
  assert.ok(boot.statements.every(s => s.status === 'Published' && s.snapshot && s.snapshot.rows.length), 'seeded statements carry computed snapshots');
  assert.equal((await other('GET', '/api/portfolio/bootstrap')).j.empty, true, 'other agency has no data');
  assert.equal((await admin('POST', '/api/portfolio/seed')).s, 409, 'seed is not repeatable');
  assert.equal((await other('POST', '/api/portfolio/tasks/T1/toggle')).s, 404, 'cannot touch another agency task');

  // ── tasks + audit ──
  assert.equal((await admin('POST', '/api/portfolio/tasks/T1/toggle')).j.status, 'Done');
  const aud = (await admin('GET', '/api/portfolio/bootstrap')).j.audit;
  assert.match(aud[0].actor, /Approver \(p-admin/); assert.equal(aud[0].action, 'Task completed'); assert.equal(aud[0].entity, 'A6');
  assert.equal((await admin('POST', '/api/portfolio/tasks/NOPE/toggle')).s, 404);

  // ── audit rows are immutable at the database level ──
  const pool = await db();
  await assert.rejects(pool.query("UPDATE audit_events SET detail='x' WHERE tenant_id=(SELECT tenant_id FROM users WHERE email=$1)", [`p-admin${tag}@t.co`]), /append-only/);
  await assert.rejects(pool.query('DELETE FROM audit_events WHERE actor LIKE $1', ['%p-admin' + tag + '%']), /append-only/);

  // ── roles: an analyst (agent) account ──
  const ai = await invite(admin, `p-analyst${tag}@t.co`, 'agent'); const analyst = (await join(ai.token)).c;
  assert.equal((await analyst('GET', '/api/portfolio/bootstrap')).j.me.label, 'Analyst');
  assert.equal((await analyst('POST', '/api/portfolio/documents/D6/review', { decision: 'approve' })).s, 403, 'analyst cannot review documents');
  assert.equal((await admin('POST', '/api/portfolio/documents/D6/review', { decision: 'maybe' })).s, 400);
  assert.equal((await admin('POST', '/api/portfolio/documents/D6/review', { decision: 'approve' })).s, 200);
  assert.equal((await admin('POST', '/api/portfolio/documents/D6/review', { decision: 'approve' })).s, 400, 'only pending documents');
  assert.equal((await analyst('POST', '/api/portfolio/assets/A6/valuation', { value: 1, date: '2026-09-30', source: 'x' })).s, 403, 'analyst cannot record valuations');

  // ── statements: maker/checker enforced with real user ids ──
  assert.equal((await analyst('POST', '/api/portfolio/statements', { investorId: 'INV-01', period: 'nope' })).s, 400);
  const st = (await analyst('POST', '/api/portfolio/statements', { investorId: 'INV-01', period: '2026-Q3' })).j;
  assert.ok(st.id);
  let cur = (await admin('GET', '/api/portfolio/bootstrap')).j.statements.find(s => s.id === st.id);
  const expectSnap = Calc.investorPeriod(boot, boot.investors[0], '2026-Q3');
  assert.deepEqual(cur.snapshot, expectSnap, 'snapshot is computed server-side and equals the tested calc');
  assert.ok(cur.notes.some(n => /Northgate/.test(n)), 'stale-valuation data note included');
  assert.equal((await analyst('POST', `/api/portfolio/statements/${st.id}/submit`, {})).s, 400, 'must acknowledge review');
  assert.equal((await analyst('POST', `/api/portfolio/statements/${st.id}/decide`, { decision: 'approve' })).s, 403, 'analyst cannot decide');
  assert.equal((await admin('POST', `/api/portfolio/statements/${st.id}/decide`, { decision: 'approve' })).s, 400, 'not in review yet');
  assert.equal((await analyst('POST', `/api/portfolio/statements/${st.id}/submit`, { acknowledged: true })).s, 200);
  assert.equal((await admin('POST', `/api/portfolio/statements/${st.id}/decide`, { decision: 'approve' })).s, 200, 'different person approves');
  assert.equal((await admin('GET', '/api/portfolio/bootstrap')).j.statements.find(s => s.id === st.id).status, 'Published');
  assert.equal((await analyst('POST', '/api/portfolio/statements', { investorId: 'INV-01', period: '2026-Q3' })).s, 400, 'published statements are final');
  const own = (await admin('POST', '/api/portfolio/statements', { investorId: 'INV-02', period: '2026-Q3' })).j;
  assert.equal((await admin('POST', `/api/portfolio/statements/${own.id}/submit`, { acknowledged: true })).s, 200);
  const selfApprove = await admin('POST', `/api/portfolio/statements/${own.id}/decide`, { decision: 'approve' });
  assert.equal(selfApprove.s, 400); assert.match(selfApprove.j.error, /Maker\/checker/);
  const actions = (await admin('GET', '/api/portfolio/bootstrap')).j.audit.map(a => a.action);
  for (const a of ['Statement drafted', 'Statement submitted for review', 'Statement approved']) assert.ok(actions.includes(a), a);

  // ── investor accounts: isolation enforced by the server ──
  assert.equal((await admin('POST', '/api/users/invite', { email: `p-bad${tag}@t.co`, role: 'investor', investor_id: 'NOPE' })).s, 400, 'investor invite needs a real investor');
  const ii = await invite(admin, `p-inv1${tag}@t.co`, 'investor', 'INV-01'); const joined = await join(ii.token); const inv1 = joined.c;
  assert.equal(joined.r.s, 201); assert.equal((await inv1('GET', '/api/auth/me')).j.investorId, 'INV-01');
  const view = (await inv1('GET', '/api/portfolio/investor-view')).j, raw = JSON.stringify(view);
  assert.equal(view.investor.id, 'INV-01'); assert.equal(view.statements.length, 2, 'Q2 sample + the Q3 we published');
  for (const leak of ['Kestrel', 'Private Investor C', 'refinancing', 'two tenants', 'internalNote', 'INV-02', 'INV-03', 'Internal call notes']) assert.ok(!raw.includes(leak), 'investor view leaked: ' + leak);
  assert.ok(view.holdings.every(h => ['A1', 'A2', 'A3', 'A4'].includes(h.id)), 'only own holdings');
  assert.equal((await inv1('GET', '/api/portfolio/investor-view?investorId=INV-02')).s, 403, 'cannot ask for another investor');
  for (const [m, p] of [['GET', '/api/portfolio/bootstrap'], ['GET', '/api/leads'], ['GET', '/api/users'], ['GET', '/api/calls'], ['POST', '/api/portfolio/tasks/T1/toggle'], ['GET', '/api/integrations'], ['POST', '/api/claude']])
    assert.equal((await inv1(m, p, m === 'POST' ? {} : undefined)).s, 403, `investor blocked from ${m} ${p}`);
  assert.equal((await inv1('GET', '/api/auth/me')).s, 200);
  // unpublished data never appears: INV-02's own draft is not visible to INV-02
  const ii2 = await invite(admin, `p-inv2${tag}@t.co`, 'investor', 'INV-02'); const inv2 = (await join(ii2.token)).c;
  const v2 = (await inv2('GET', '/api/portfolio/investor-view')).j; assert.ok(!v2.statements.some(s => s.period === '2026-Q3'), 'draft/in-review statement hidden from its investor');
  // operators can preview a given investor; account changes for investors are blocked
  assert.equal((await admin('GET', '/api/portfolio/investor-view?investorId=INV-03')).j.investor.id, 'INV-03');
  assert.equal((await admin('GET', '/api/portfolio/investor-view')).s, 400);
  const uid = (await admin('GET', '/api/users')).j.users.find(u => u.email === `p-inv1${tag}@t.co`).id;
  assert.equal((await admin('PATCH', '/api/users/' + uid, { role: 'admin' })).s, 400, 'investor cannot be promoted');
  assert.equal((await admin('DELETE', '/api/users/' + uid)).s, 200); assert.equal((await inv1('GET', '/api/portfolio/investor-view')).s, 401, 'removed investor locked out at once');

  // ── asset creation: validation, audit, appears in data ──
  const bad = await analyst('POST', '/api/portfolio/assets', { name: '', portfolio: 'PX', cost: -1, acquired: 'yesterday', occupancy: [2] });
  assert.equal(bad.s, 400); for (const w of ['name is required', 'portfolio', 'cost', 'acquired', 'occupancy']) assert.ok(bad.j.error.includes(w), w);
  const created = await analyst('POST', '/api/portfolio/assets', { name: 'Test Court', type: 'Retail', portfolio: 'P1', location: 'Test', cost: 5000000, acquired: '2026-01-15', capacity: 1000, unit: 'sqm', gpr: 40000, other: 1000, opex: { maintenance: 5000 }, occupancy: Array(12).fill(0.9) });
  assert.equal(created.s, 201); assert.equal(created.j.id, 'A9');
  const after = (await admin('GET', '/api/portfolio/bootstrap')).j; const na = after.assets.find(a => a.id === 'A9');
  assert.equal(na.valuation, null); assert.equal(na.opex.maintenance, 5000);
  assert.ok(Calc.exceptions(after, '2026-Q3').some(e => e.id === 'val-missing-A9'), 'new asset is flagged for its missing valuation');
  assert.equal(after.audit[0].action, 'Asset created');
  assert.equal((await admin('POST', '/api/portfolio/assets/A9/valuation', { value: 5200000, date: '2026-09-30', source: 'Independent appraisal (test)' })).s, 200);
  assert.equal((await admin('POST', '/api/portfolio/assets/A9/valuation', { value: 0, date: '2026-09-30', source: 's' })).s, 400);
  assert.equal((await admin('POST', '/api/portfolio/assets/A9/valuation', { value: 1, date: '30/09/2026', source: 's' })).s, 400);
  assert.equal((await admin('POST', '/api/portfolio/assets/ZZ/valuation', { value: 1, date: '2026-09-30', source: 's' })).s, 404);
  assert.equal((await other('GET', '/api/portfolio/bootstrap')).j.empty, true, 'asset did not leak to another agency');

  // ── config ──
  assert.equal((await analyst('PATCH', '/api/portfolio/config', { currency: 'EUR' })).s, 403);
  assert.equal((await admin('PATCH', '/api/portfolio/config', { currency: 'XYZ' })).s, 400);
  assert.equal((await admin('PATCH', '/api/portfolio/config', { targetYield: 0.9 })).s, 400);
  assert.equal((await admin('PATCH', '/api/portfolio/config', { currency: 'EUR', locale: 'de-DE', targetYield: 0.055 })).s, 200);
  const cfg = (await analyst('GET', '/api/portfolio/bootstrap')).j.config; assert.deepEqual([cfg.currency, cfg.locale, cfg.targetYield], ['EUR', 'de-DE', 0.055], 'config persisted for everyone in the agency');
  console.log('portfolio API tests passed');
}
main().then(() => 0, e => { console.error(e); process.exitCode = 1; }).finally(() => { srv.close(); close(); });
