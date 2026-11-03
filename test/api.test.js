// Integration test against a real Postgres. Run: DATABASE_URL=postgres://... npm test
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'test-secret-test-secret-test-secret-123';
const assert = require('assert'), http = require('http');
const { handle } = require('../lib/router');
const { close } = require('../lib/db');
// Mock Anthropic API: records requests, answers with a canned reply.
const seen = [];
const mock = http.createServer(async (q, r) => {
  let b = ''; for await (const c of q) b += c; seen.push(JSON.parse(b));
  r.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ content: [{ type: 'text', text: 'reply ' + seen.length }] }));
});
const srv = http.createServer(async (q, r) => { if (!(await handle(q, r))) r.writeHead(404).end(); });

async function main() {
  await new Promise(r => mock.listen(0, r));
  process.env.ANTHROPIC_API_KEY = 'test'; process.env.ANTHROPIC_API_URL = 'http://127.0.0.1:' + mock.address().port;
  await new Promise(r => srv.listen(0, r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const mk = () => { let cookie = ''; return async (method, p, b, h = {}) => {
    const r = await fetch(base + p, { method, headers: { 'content-type': 'application/json', cookie, ...h }, body: b === undefined ? undefined : JSON.stringify(b) });
    const sc = r.headers.get('set-cookie'); if (sc) cookie = sc.split(';')[0];
    return { s: r.status, j: await r.json().catch(() => null) };
  }; };
  const a = mk(), b = mk(), tag = Date.now();

  assert.equal((await a('GET', '/api/leads')).s, 401, 'leads need a session');
  assert.equal((await a('POST', '/api/auth/signup', { email: 'x@y.co', password: 'short' })).s, 400);
  assert.equal((await a('POST', '/api/auth/signup', { email: `a${tag}@t.co`, password: 'correct-horse-1', agency: 'A', seed_demo: true })).s, 201);
  assert.equal((await a('POST', '/api/auth/signup', { email: `a${tag}@t.co`, password: 'correct-horse-1' })).s, 409, 'duplicate email');
  assert.equal((await b('POST', '/api/auth/signup', { email: `b${tag}@t.co`, password: 'correct-horse-2', agency: 'B' })).s, 201);

  const la = (await a('GET', '/api/leads')).j;
  assert.equal(la.length, 8, 'demo seed');
  assert.equal((await b('GET', '/api/leads')).j.length, 0, 'tenant B sees nothing of A');

  // tenant isolation on write paths
  assert.equal((await b('PATCH', '/api/leads/' + la[0].id, { name: 'hijack' })).s, 404);
  assert.equal((await b('DELETE', '/api/leads/' + la[0].id)).s, 404);

  const c = (await a('POST', '/api/leads', { name: '<b>Eve</b>', score: 90, photo: 'javascript:alert(1)' })).j;
  assert.equal(c.temp, 'hot'); assert.equal(c.photo, '', 'non-https photo dropped');
  assert.equal((await a('POST', '/api/leads', { name: '' })).s, 400);
  assert.equal((await a('PATCH', '/api/leads/' + c.id, { score: 20 })).j.temp, 'cold');
  assert.equal((await a('DELETE', '/api/leads/' + c.id)).s, 200);

  const csv = 'Name,Phone,Budget,Score,Type\r\n"Smith, Jo",+971 50 1,AED 2M,80,Buyer\r\n,x,y,1,Buyer\r\nLee,+971 55 2,"AED ""3M""",30,Seller\r\n';
  const imp = (await a('POST', '/api/leads/import', { csv })).j;
  assert.deepEqual([imp.imported, imp.skipped], [2, 1]);
  assert.equal((await a('GET', '/api/leads')).j.find(l => l.name === 'Smith, Jo').temp, 'hot');
  assert.equal((await a('GET', '/api/leads')).j.find(l => l.name === 'Lee').intent, 'seller');

  // security
  assert.equal((await a('POST', '/api/leads', { name: 'x' }, { origin: 'http://evil.example' })).s, 403);
  assert.equal((await a('POST', '/api/leads', { name: 'x' }, { 'content-type': 'text/plain' })).s, 415);
  assert.equal((await mk()('POST', '/api/auth/login', { email: `a${tag}@t.co`, password: 'wrong-password' })).s, 401);
  assert.equal((await a('POST', '/api/claude', { messages: [{ role: 'system', content: 'x' }] })).s, 400);
  const me = await a('GET', '/api/auth/me'); assert.equal(me.j.agency, 'A');
  // voice calls
  const call = (await a('POST', '/api/calls', { lead_name: 'ahmed al khalidi', lang: 'ar' })).j;
  assert.equal((await b('GET', '/api/calls/' + call.id)).s, 404, 'other tenant cannot read call');
  assert.equal((await b('POST', `/api/calls/${call.id}/say`, { text: 'hi' })).s, 404);
  assert.equal((await a('POST', `/api/calls/${call.id}/say`, { text: '' })).j.reply, 'reply 1', 'greeting on connect');
  assert.equal((await a('POST', `/api/calls/${call.id}/say`, { text: 'أريد فيلا' })).j.reply, 'reply 2');
  const sys = seen[1].system;
  assert.match(sys, /Arabic/); assert.match(sys, /A\b/, 'agency name in prompt'); assert.match(sys, /budget AED 4M/, 'lead context found by name');
  assert.deepEqual(seen[1].messages.map(m => m.role), ['user', 'assistant', 'user'], 'roles alternate, start with user');
  assert.equal(seen[1].max_tokens, 300);
  assert.equal((await a('POST', `/api/calls/${call.id}/say`, { text: '' })).s, 400, 'empty text after greeting');
  const full = (await a('GET', '/api/calls/' + call.id)).j;
  assert.deepEqual(full.turns.map(t => t.role), ['assistant', 'user', 'assistant']);
  assert.equal((await a('POST', `/api/calls/${call.id}/end`, { outcome: 'Viewing booked' })).j.outcome, 'Viewing booked');
  assert.equal((await a('POST', `/api/calls/${call.id}/say`, { text: 'again' })).s, 400, 'cannot talk after end');
  const list = (await a('GET', '/api/calls')).j; assert.equal(list[0].turns, 3);
  assert.equal((await b('GET', '/api/calls')).j.length, 0, 'call list is tenant scoped');
  // invites + roles
  const c2 = mk(), tokenless = mk();
  assert.equal((await b('GET', '/api/users')).j.users.length, 1);
  const inv = (await a('POST', '/api/users/invite', { email: `ag${tag}@t.co`, role: 'agent' })).j;
  assert.ok(inv.token && inv.token.length > 30);
  assert.equal((await a('POST', '/api/users/invite', { email: `a${tag}@t.co` })).s, 409, 'already a user');
  assert.equal((await a('POST', '/api/users/invite', { email: 'nope' })).s, 400);
  assert.equal((await tokenless('GET', '/api/auth/invite?token=wrong')).s, 404);
  assert.equal((await tokenless('GET', '/api/auth/invite?token=' + inv.token)).j.agency, 'A');
  assert.equal((await tokenless('POST', '/api/auth/accept', { token: inv.token, password: 'short' })).s, 400);
  assert.equal((await c2('POST', '/api/auth/accept', { token: inv.token, password: 'agent-password-1' })).s, 201);
  assert.equal((await tokenless('POST', '/api/auth/accept', { token: inv.token, password: 'agent-password-2' })).s, 404, 'invite is single-use');
  assert.equal((await c2('GET', '/api/auth/me')).j.role, 'agent');
  assert.equal((await c2('GET', '/api/leads')).j.length > 0, true, 'agent sees the agency leads');
  assert.equal((await c2('GET', '/api/users')).s, 403, 'agent cannot list users');
  assert.equal((await c2('POST', '/api/users/invite', { email: 'x@y.co' })).s, 403);
  const target = (await c2('GET', '/api/leads')).j[0];
  assert.equal((await c2('DELETE', '/api/leads/' + target.id)).s, 403, 'agent cannot delete leads');
  assert.equal((await c2('POST', '/api/leads/import', { csv: 'name\nX' })).s, 403, 'agent cannot import');
  assert.equal((await c2('PATCH', '/api/leads/' + target.id, { status: 'Qualified' })).s, 200, 'agent can edit leads');
  // calls are private to agents; admin sees all
  assert.equal((await c2('GET', '/api/calls')).j.length, 0, 'agent does not see admin calls');
  assert.equal((await c2('GET', '/api/calls/' + call.id)).s, 404);
  const mine = (await c2('POST', '/api/calls', { lead_name: 'Z' })).j;
  assert.equal((await a('GET', '/api/calls/' + mine.id)).s, 200, 'admin sees agent call');
  // integrations / intake / dedupe
  const raw = (key, body, h = {}) => fetch(base + '/api/intake/' + key, { method: 'POST', headers: { 'content-type': 'application/json', ...h }, body: JSON.stringify(body) }).then(async r => ({ s: r.status, j: await r.json() }));
  assert.equal((await a('POST', '/api/integrations', { label: '' })).s, 400, 'label required');
  assert.equal((await a('POST', '/api/integrations', { label: 'X', adapter: 'nope' })).s, 400, 'unknown adapter');
  const ig = (await a('POST', '/api/integrations', { label: 'Bayut' })).j;
  assert.ok(ig.key.length >= 30 && ig.path === '/api/intake/' + ig.key);
  assert.equal((await b('GET', '/api/integrations')).j.integrations.length, 0, 'tenant scoped');
  assert.equal((await raw('x'.repeat(32), { name: 'N' })).s, 404, 'unknown key');
  assert.equal((await b('POST', '/api/integrations', { label: 'B-portal' })).s, 201);
  const before = (await a('GET', '/api/leads')).j.length;
  let r1 = (await raw(ig.key, { Full_Name: 'Layla Hassan', Mobile: '050 111 2233', Email: 'Layla@X.com', price: 2500000, message: 'Interested in 2BR', community: 'Marina' })).j;
  assert.deepEqual([r1.created, r1.duplicates], [1, 0]);
  let L = (await a('GET', '/api/leads')).j; assert.equal(L.length, before + 1);
  const layla = L.find(l => l.name === 'Layla Hassan');
  assert.equal(layla.source, 'Bayut', 'source defaults to the integration label');
  assert.equal(layla.budget, 'AED 2,500,000'); assert.equal(layla.notes, 'Interested in 2BR'); assert.equal(layla.area, 'Marina');
  // same person, different phone formatting -> merged, not duplicated; blank fields filled, existing never overwritten
  const r2 = (await raw(ig.key, { name: 'Layla H.', phone: '+971 50 111 2233', timeframe: '3 months', budget: 'AED 9M' })).j;
  assert.deepEqual([r2.created, r2.duplicates, r2.merged], [0, 1, 1]);
  L = (await a('GET', '/api/leads')).j; assert.equal(L.length, before + 1, 'no new row');
  const l2 = L.find(l => l.id === layla.id);
  assert.equal(l2.timeframe, '3 months'); assert.equal(l2.budget, 'AED 2,500,000', 'not overwritten'); assert.equal(l2.name, 'Layla Hassan');
  // email-only match
  assert.equal((await raw(ig.key, { name: 'L', email: 'LAYLA@x.com' })).j.duplicates, 1);
  // batch with an in-batch duplicate, a nameless record, and one new person
  const r3 = (await raw(ig.key, [{ name: 'Omar K', phone: '0559998877' }, { name: 'Omar Khan', phone: '+971559998877' }, { phone: '1' }, { name: 'Sam', email: 's@x.com' }])).j;
  assert.deepEqual([r3.created, r3.duplicates, r3.errors.length], [2, 1, 1]);
  assert.equal((await raw(ig.key, { leads: Array.from({ length: 201 }, () => ({ name: 'q' })) })).s, 400, 'batch cap');
  // tenant isolation: A's key never writes to B
  assert.equal((await b('GET', '/api/leads')).j.length, 0);
  // CSV import also dedupes
  const imp2 = (await a('POST', '/api/leads/import', { csv: 'name,phone,notes\nLayla again,00971501112233,from csv\nNew One,0501230000,hi' })).j;
  assert.deepEqual([imp2.imported, imp2.duplicates], [1, 1]);
  const ig2 = (await a('GET', '/api/integrations')).j.integrations[0]; assert.equal(ig2.received >= 5, true);
  assert.equal(JSON.stringify(ig2).includes(ig.key), false, 'key is never listed again');
  assert.equal((await a('DELETE', '/api/integrations/' + ig2.id)).s, 200);
  assert.equal((await raw(ig.key, { name: 'late' })).s, 404, 'revoked key stops working');
  // admin management
  const users = (await a('GET', '/api/users')).j.users, agentRow = users.find(u => u.role === 'agent'), adminRow = users.find(u => u.role === 'admin');
  assert.equal((await a('DELETE', '/api/users/' + adminRow.id)).s, 400, 'cannot remove yourself');
  assert.equal((await a('PATCH', '/api/users/' + adminRow.id, { role: 'agent' })).s, 400, 'last admin cannot be demoted');
  assert.equal((await b('PATCH', '/api/users/' + agentRow.id, { role: 'admin' })).s, 404, 'other tenant cannot touch this tenant\'s users');
  assert.equal((await a('PATCH', '/api/users/' + agentRow.id, { role: 'admin' })).j.role, 'admin');
  assert.equal((await c2('GET', '/api/users')).s, 200, 'promotion applies immediately, no re-login');
  assert.equal((await a('PATCH', '/api/users/' + agentRow.id, { role: 'agent' })).j.role, 'agent');
  assert.equal((await c2('GET', '/api/users')).s, 403, 'demotion applies immediately');
  const inv2 = (await a('POST', '/api/users/invite', { email: `gone${tag}@t.co` })).j;
  assert.equal((await a('DELETE', '/api/invites/' + inv2.id)).s, 200);
  assert.equal((await tokenless('GET', '/api/auth/invite?token=' + inv2.token)).s, 404, 'revoked invite');
  assert.equal((await a('DELETE', '/api/users/' + agentRow.id)).s, 200);
  assert.equal((await c2('GET', '/api/leads')).s, 401, 'removed user is locked out immediately');
  await a('POST', '/api/auth/logout', {});
  console.log('all API tests passed');
}
main().then(() => 0, e => { console.error(e); process.exitCode = 1; }).finally(() => { srv.close(); mock.close(); close(); });
