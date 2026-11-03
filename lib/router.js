// One router for both Vercel (api/index.js) and the local server (server.js).
const { db } = require('./db');
const A = require('./auth');
const { parseCSV } = require('./csv');
const seed = require('./seed-leads.json');
const V = require('./voice');

const MAX_MSGS = 40, MAX_CHARS = 20000, MAX_CSV = 1e6, MAX_IMPORT = 2000;
const send = (res, code, obj, headers = {}) =>
  res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers }).end(JSON.stringify(obj));

// shortcut: in-memory counters reset on restart and are per serverless instance; move to Redis/Postgres if abuse shows up.
const hits = new Map();
setInterval(() => hits.clear(), 60e3).unref();
const limited = (key, max) => { const n = (hits.get(key) || 0) + 1; hits.set(key, n); return n > max; };

async function body(req, max = 2e6) {
  if (req.body !== undefined && req.body !== null) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  let s = '';
  for await (const c of req) { s += c; if (s.length > max) throw Object.assign(new Error('too large'), { code: 413 }); }
  return s ? JSON.parse(s) : {};
}

const str = (v, n = 200) => String(v ?? '').trim().slice(0, n);
const oneOf = (v, list, d) => list.includes(String(v).toLowerCase()) ? String(v).toLowerCase() : d;
const FIELDS = ['name', 'phone', 'email', 'type', 'source', 'budget', 'timeframe', 'financing', 'agent', 'status', 'area'];
function cleanLead(i, partial) {
  const o = {};
  for (const f of FIELDS) if (!partial || i[f] !== undefined) o[f] = str(i[f]);
  if (!partial || i.score !== undefined) {
    const n = Math.round(Number(i.score));
    o.score = Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 50;
  }
  if (!partial || i.temp !== undefined || i.score !== undefined)
    o.temp = oneOf(i.temp, ['hot', 'warm', 'cold'], o.score >= 75 ? 'hot' : o.score >= 50 ? 'warm' : 'cold');
  if (!partial || i.intent !== undefined || i.type !== undefined)
    o.intent = oneOf(i.intent ?? (/sell/i.test(o.type || '') ? 'seller' : 'buyer'), ['buyer', 'seller', 'investor'], 'buyer');
  if (!partial || i.urgency !== undefined) o.urgency = oneOf(i.urgency, ['serious', 'researching', 'urgent'], 'researching');
  if (!partial || i.photo !== undefined) o.photo = /^https:\/\//.test(str(i.photo, 500)) ? str(i.photo, 500) : '';
  if (!partial && !o.name) throw Object.assign(new Error('name is required'), { code: 400 });
  if (partial && o.name === '') throw Object.assign(new Error('name cannot be empty'), { code: 400 });
  return o;
}
const COLS = 'id,name,phone,email,score,temp,type,source,budget,timeframe,financing,agent,status,intent,urgency,area,photo,created_at';

async function insertLeads(p, tid, list) {
  const out = [];
  for (const l of list) {
    const k = Object.keys(l);
    const r = await p.query(`INSERT INTO leads (tenant_id,${k.join(',')}) VALUES ($1,${k.map((_, i) => '$' + (i + 2)).join(',')}) RETURNING ${COLS}`, [tid, ...k.map(x => l[x])]);
    out.push(r.rows[0]);
  }
  return out;
}

async function handle(req, res) {
  const url = new URL(req.url, 'http://x'), route = url.pathname.replace(/\/+$/, ''), m = req.method;
  if (!route.startsWith('/api/')) return false;
  const secure = (req.headers['x-forwarded-proto'] || '') === 'https';
  try {
    if (route === '/api/health') return send(res, 200, { ok: true });
    if (m !== 'GET' && m !== 'HEAD') {
      // Same-origin only: SameSite=Lax cookies plus this check stop cross-site writes and key spending.
      const o = req.headers.origin;
      if (o && new URL(o).host !== req.headers.host) return send(res, 403, { error: 'forbidden origin' });
      if (!/^application\/json/.test(req.headers['content-type'] || '')) return send(res, 415, { error: 'json only' });
    }
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;

    if (route === '/api/auth/signup' || route === '/api/auth/login') {
      if (limited('auth:' + ip, 10)) return send(res, 429, { error: 'too many attempts, wait a minute' });
      const b = await body(req), email = str(b.email, 254).toLowerCase(), pw = String(b.password ?? '');
      const p = await db();
      if (route.endsWith('login')) {
        const u = (await p.query('SELECT * FROM users WHERE email=$1', [email])).rows[0];
        if (!u || !(await A.checkPassword(pw, u.pw_hash))) return send(res, 401, { error: 'wrong email or password' });
        return send(res, 200, { email: u.email, role: u.role }, { 'set-cookie': A.makeCookie(u, secure) });
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return send(res, 400, { error: 'valid email required' });
      if (pw.length < 10 || pw.length > 200) return send(res, 400, { error: 'password must be 10+ characters' });
      const agency = str(b.agency) || 'My Agency';
      const c = await p.connect();
      let user;
      try {
        await c.query('BEGIN');
        const t = (await c.query('INSERT INTO tenants (name) VALUES ($1) RETURNING id', [agency])).rows[0];
        user = (await c.query("INSERT INTO users (tenant_id,email,pw_hash,role) VALUES ($1,$2,$3,'admin') RETURNING *", [t.id, email, await A.hashPassword(pw)])).rows[0];
        await c.query('COMMIT');
      } catch (e) {
        await c.query('ROLLBACK');
        if (e.code === '23505') return send(res, 409, { error: 'email already registered' });
        throw e;
      } finally { c.release(); }
      if (b.seed_demo) await insertLeads(p, user.tenant_id, seed.map(s => cleanLead(s)));
      return send(res, 201, { email: user.email, role: user.role }, { 'set-cookie': A.makeCookie(user, secure) });
    }
    if (route === '/api/auth/logout') return send(res, 200, { ok: true }, { 'set-cookie': A.clearCookie() });

    const s = A.readSession(req);
    if (!s) return send(res, 401, { error: 'not signed in' });
    if (route === '/api/auth/me') {
      const u = (await (await db()).query('SELECT email,role,(SELECT name FROM tenants WHERE id=$2) AS agency FROM users WHERE id=$1 AND tenant_id=$2', [s.uid, s.tid])).rows[0];
      return u ? send(res, 200, u) : send(res, 401, { error: 'not signed in' });
    }

    if (route === '/api/claude' && m === 'POST') {
      if (limited('claude:' + s.uid, 20)) return send(res, 429, { error: 'rate limited' });
      const { system, messages } = await body(req);
      const ok = Array.isArray(messages) && messages.length > 0 && messages.length <= MAX_MSGS &&
        messages.every(x => x && (x.role === 'user' || x.role === 'assistant') && typeof x.content === 'string' && x.content.length <= MAX_CHARS);
      if (!ok || (system !== undefined && (typeof system !== 'string' || system.length > MAX_CHARS))) return send(res, 400, { error: 'bad request' });
      if (!process.env.ANTHROPIC_API_KEY) return send(res, 503, { error: 'ANTHROPIC_API_KEY not configured' });
      // Model and max_tokens are fixed here so a browser caller cannot raise cost.
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 1000, system, messages }),
      });
      return res.writeHead(r.status, { 'content-type': 'application/json' }).end(await r.text());
    }

    const p = await db();
    if (route === '/api/leads' && m === 'GET')
      return send(res, 200, (await p.query(`SELECT ${COLS} FROM leads WHERE tenant_id=$1 ORDER BY id`, [s.tid])).rows);
    if (route === '/api/leads' && m === 'POST')
      return send(res, 201, (await insertLeads(p, s.tid, [cleanLead(await body(req))]))[0]);
    if (route === '/api/leads/import' && m === 'POST') {
      const { csv } = await body(req);
      if (typeof csv !== 'string' || csv.length > MAX_CSV) return send(res, 400, { error: 'csv text required (max 1MB)' });
      const rows = parseCSV(csv);
      if (!rows.length) return send(res, 400, { error: 'no data rows found' });
      if (rows.length > MAX_IMPORT) return send(res, 400, { error: `max ${MAX_IMPORT} rows per import` });
      const good = [], errors = [];
      rows.forEach((r, i) => { try { good.push(cleanLead(r)); } catch (e) { errors.push({ row: i + 2, error: e.message }); } });
      const c = await p.connect();
      try { await c.query('BEGIN'); await insertLeads(c, s.tid, good); await c.query('COMMIT'); }
      catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
      return send(res, 200, { imported: good.length, skipped: errors.length, errors: errors.slice(0, 20) });
    }
    const one = route.match(/^\/api\/leads\/(\d+)$/);
    if (one && m === 'PATCH') {
      const l = cleanLead(await body(req), true), k = Object.keys(l);
      if (!k.length) return send(res, 400, { error: 'nothing to update' });
      const r = await p.query(`UPDATE leads SET ${k.map((x, i) => `${x}=$${i + 3}`).join(',')} WHERE id=$1 AND tenant_id=$2 RETURNING ${COLS}`, [one[1], s.tid, ...k.map(x => l[x])]);
      return r.rows[0] ? send(res, 200, r.rows[0]) : send(res, 404, { error: 'not found' });
    }
    if (one && m === 'DELETE') {
      const r = await p.query('DELETE FROM leads WHERE id=$1 AND tenant_id=$2', [one[1], s.tid]);
      return r.rowCount ? send(res, 200, { ok: true }) : send(res, 404, { error: 'not found' });
    }

    if (route === '/api/calls' && m === 'POST') {
      const b = await body(req);
      const r = await p.query('INSERT INTO calls (tenant_id,user_id,lead_name,lang) VALUES ($1,$2,$3,$4) RETURNING id,lead_name,lang,started_at',
        [s.tid, s.uid, str(b.lead_name) || 'Unknown lead', oneOf(b.lang, ['en', 'ar'], 'en')]);
      return send(res, 201, r.rows[0]);
    }
    if (route === '/api/calls' && m === 'GET')
      return send(res, 200, (await p.query(`SELECT c.id,c.lead_name,c.lang,c.outcome,c.started_at,c.ended_at,
          (SELECT count(*)::int FROM call_turns t WHERE t.call_id=c.id) AS turns
        FROM calls c WHERE c.tenant_id=$1 ORDER BY c.id DESC LIMIT 200`, [s.tid])).rows);
    const call = route.match(/^\/api\/calls\/(\d+)(?:\/(say|end))?$/);
    if (call) {
      const row = (await p.query('SELECT * FROM calls WHERE id=$1 AND tenant_id=$2', [call[1], s.tid])).rows[0];
      if (!row) return send(res, 404, { error: 'not found' });
      if (!call[2] && m === 'GET') {
        const turns = (await p.query('SELECT role,text,created_at FROM call_turns WHERE call_id=$1 ORDER BY id', [row.id])).rows;
        return send(res, 200, { ...row, turns });
      }
      if (call[2] === 'end' && m === 'POST') {
        const b = await body(req);
        const r = await p.query('UPDATE calls SET ended_at=COALESCE(ended_at,now()), outcome=$3 WHERE id=$1 AND tenant_id=$2 RETURNING id,ended_at,outcome',
          [row.id, s.tid, str(b.outcome, 60)]);
        return send(res, 200, r.rows[0]);
      }
      if (call[2] === 'say' && m === 'POST') {
        if (row.ended_at) return send(res, 400, { error: 'call has ended' });
        if (limited('say:' + s.uid, 30)) return send(res, 429, { error: 'slow down a little' });
        const text = str((await body(req)).text, 2000);
        const hist = (await p.query('SELECT role,text FROM call_turns WHERE call_id=$1 ORDER BY id DESC LIMIT 30', [row.id])).rows.reverse();
        if (!text && hist.length) return send(res, 400, { error: 'text is required' });
        if (hist.length >= 200) return send(res, 400, { error: 'call is too long, please end it' });
        const lead = (await p.query('SELECT type,budget,area,timeframe,financing,source FROM leads WHERE tenant_id=$1 AND lower(name)=lower($2) LIMIT 1', [s.tid, row.lead_name])).rows[0];
        const agency = (await p.query('SELECT name FROM tenants WHERE id=$1', [s.tid])).rows[0].name;
        // An empty first message means "connect the call": the agent opens with a greeting.
        const messages = [{ role: 'user', content: '(call connected)' }, ...hist.map(h => ({ role: h.role, content: h.text })), ...(text ? [{ role: 'user', content: text }] : [])];
        const reply = await V.askClaude({ system: V.systemPrompt({ agency, lang: row.lang, lead }), messages });
        const rows = text ? [['user', text], ['assistant', reply]] : [['assistant', reply]];
        for (const [role, t] of rows) await p.query('INSERT INTO call_turns (call_id,tenant_id,role,text) VALUES ($1,$2,$3,$4)', [row.id, s.tid, role, t]);
        return send(res, 200, { reply });
      }
    }
    return send(res, 404, { error: 'not found' });
  } catch (e) {
    if (e instanceof SyntaxError) return send(res, 400, { error: 'invalid json' });
    if ([400, 413, 502, 503].includes(e.code)) return send(res, e.code, { error: e.message });
    console.error(e);
    return send(res, 500, { error: 'server error' });
  }
}
module.exports = { handle };
