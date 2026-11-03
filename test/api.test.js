// Integration test against a real Postgres. Run: DATABASE_URL=postgres://... npm test
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'test-secret-test-secret-test-secret-123';
const assert = require('assert'), http = require('http');
const { handle } = require('../lib/router');
const { close } = require('../lib/db');
const srv = http.createServer(async (q, r) => { if (!(await handle(q, r))) r.writeHead(404).end(); });

async function main() {
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
  await a('POST', '/api/auth/logout', {});
  console.log('all API tests passed');
}
main().then(() => 0, e => { console.error(e); process.exitCode = 1; }).finally(() => { srv.close(); close(); });
