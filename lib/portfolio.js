// Portfolio & investor operations service. Tenant-scoped. Calculations reuse the same tested pure functions as the
// browser prototype (public/demo/js/calc.js), so numbers computed on the server match what the UI shows.
const Calc = require('../public/demo/js/calc.js');
const SAMPLE = require('../public/demo/js/data.js');

const ROLE_LABEL = { admin: 'Approver', agent: 'Analyst' };
const STATUSES = ['Stabilised', 'Lease-up', 'Refurbishment', 'Held for sale'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'AUD'], LOCALES = ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'ar-AE', 'ar-SA'];
const clone = x => JSON.parse(JSON.stringify(x));
const fail = (code, message) => Object.assign(new Error(message), { code });
const nextId = (rows, prefix) => prefix + (rows.reduce((m, r) => Math.max(m, parseInt(String(r.id).replace(/\D/g, ''), 10) || 0), 0) + 1);
const D = s => s ? String(s).slice(0, 10) : null;
const isoDate = v => /^\d{4}-\d{2}-\d{2}$/.test(String(v)) && !isNaN(Date.parse(v + 'T00:00:00Z')) ? String(v) : null;

async function audit(c, tid, me, action, entity, detail) {
  await c.query('INSERT INTO audit_events (tenant_id,actor,action,entity,detail,user_id) VALUES ($1,$2,$3,$4,$5,$6)',
    [tid, `${ROLE_LABEL[me.role] || me.role} (${me.email})`, action, entity, String(detail).slice(0, 500), me.id]);
}

async function load(p, tid) {
  const q = (sql) => p.query(sql, [tid]).then(r => r.rows);
  const [cfg, ports, assets, leases, docs, tasks, invs, comms, stmts, aud] = await Promise.all([
    q('SELECT config,months,periods FROM portfolio_config WHERE tenant_id=$1'),
    q('SELECT id,name,strategy FROM portfolios WHERE tenant_id=$1 ORDER BY id'),
    q(`SELECT id,portfolio_id,name,type,location,status,capacity::float8 AS capacity,unit,to_char(acquired,'YYYY-MM-DD') AS acquired,cost::float8 AS cost,
         valuation_value::float8 AS vv,to_char(valuation_date,'YYYY-MM-DD') AS vd,valuation_source AS vs,target_yield::float8 AS ty,internal_note,gpr::float8 AS gpr,other_income::float8 AS other,opex,occupancy,one_off
       FROM assets WHERE tenant_id=$1 ORDER BY id`),
    q(`SELECT id,asset_id,tenant_name,space,to_char(lease_end,'YYYY-MM-DD') AS lease_end,note FROM leases WHERE tenant_id=$1 ORDER BY id`),
    q(`SELECT id,scope,ref,name,type,status,to_char(doc_date,'YYYY-MM-DD') AS doc_date,to_char(expires,'YYYY-MM-DD') AS expires,owner_name,to_char(due_date,'YYYY-MM-DD') AS due_date,visibility,period FROM documents WHERE tenant_id=$1 ORDER BY id`),
    q(`SELECT id,asset_id,title,owner_name,to_char(due_date,'YYYY-MM-DD') AS due_date,priority,status FROM tasks WHERE tenant_id=$1 ORDER BY id`),
    q('SELECT id,name,type,contact,holdings FROM investors WHERE tenant_id=$1 ORDER BY id'),
    q(`SELECT id,investor_id,to_char(at,'YYYY-MM-DD') AS at,direction,subject,internal FROM communications WHERE tenant_id=$1 ORDER BY id`),
    q('SELECT id,investor_id,period,status,prepared_by,prepared_by_user,approved_by,snapshot,notes,reviewed FROM statements WHERE tenant_id=$1 ORDER BY id'),
    q(`SELECT id::text AS id,to_char(at AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS"Z"') AS at,actor,action,entity,detail FROM audit_events WHERE tenant_id=$1 ORDER BY id DESC LIMIT 500`),
  ]);
  if (!cfg[0]) return null;
  return {
    config: cfg[0].config, months: cfg[0].months, periods: cfg[0].periods, portfolios: ports,
    assets: assets.map(a => ({ id: a.id, name: a.name, type: a.type, portfolio: a.portfolio_id, location: a.location, status: a.status, capacity: a.capacity, unit: a.unit, acquired: a.acquired, cost: a.cost,
      valuation: a.vv == null ? null : { value: a.vv, date: a.vd, source: a.vs }, ...(a.ty != null ? { targetYield: a.ty } : {}), gpr: a.gpr, other: a.other, opex: a.opex, occ: a.occupancy, oneOff: a.one_off, internalNote: a.internal_note })),
    leases: leases.map(l => ({ assetId: l.asset_id, tenant: l.tenant_name, space: l.space, end: l.lease_end, note: l.note })),
    documents: docs.map(d => ({ id: d.id, scope: d.scope, ref: d.ref, name: d.name, type: d.type, status: d.status, date: d.doc_date, expires: d.expires, owner: d.owner_name, due: d.due_date, visibility: d.visibility, ...(d.period ? { period: d.period } : {}) })),
    tasks: tasks.map(t => ({ id: t.id, assetId: t.asset_id, title: t.title, owner: t.owner_name, due: t.due_date, priority: t.priority, status: t.status })),
    investors: invs.map(i => ({ id: i.id, name: i.name, type: i.type, contact: i.contact, holdings: i.holdings })),
    communications: comms.map(c => ({ id: c.id, investorId: c.investor_id, at: c.at, direction: c.direction, subject: c.subject, internal: c.internal })),
    statements: stmts.map(s => ({ id: s.id, investorId: s.investor_id, period: s.period, status: s.status, preparedBy: s.prepared_by, preparedByUser: s.prepared_by_user, approvedBy: s.approved_by, snapshot: s.snapshot, notes: s.notes, reviewed: s.reviewed })),
    audit: aud,
  };
}

// Load the sample dataset into a tenant. Statement snapshots for the sample's published statements are computed here.
async function seed(c, tid) {
  const S = clone(SAMPLE);
  await c.query('INSERT INTO portfolio_config (tenant_id,config,months,periods) VALUES ($1,$2,$3,$4)', [tid, S.config, JSON.stringify(S.months), JSON.stringify(S.periods)]);
  for (const x of S.portfolios) await c.query('INSERT INTO portfolios (tenant_id,id,name,strategy) VALUES ($1,$2,$3,$4)', [tid, x.id, x.name, x.strategy]);
  for (const a of S.assets) await c.query(`INSERT INTO assets (tenant_id,id,portfolio_id,name,type,location,status,capacity,unit,acquired,cost,valuation_value,valuation_date,valuation_source,target_yield,internal_note,gpr,other_income,opex,occupancy,one_off)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`,
    [tid, a.id, a.portfolio, a.name, a.type, a.location, a.status, a.capacity, a.unit, a.acquired, a.cost, a.valuation?.value ?? null, a.valuation?.date ?? null, a.valuation?.source ?? null, a.targetYield ?? null, a.internalNote || '', a.gpr, a.other, a.opex, JSON.stringify(a.occ), a.oneOff]);
  for (const l of S.leases) await c.query('INSERT INTO leases (tenant_id,asset_id,tenant_name,space,lease_end,note) VALUES ($1,$2,$3,$4,$5,$6)', [tid, l.assetId, l.tenant, l.space, l.end, l.note]);
  for (const d of S.documents) await c.query('INSERT INTO documents (tenant_id,id,scope,ref,name,type,status,doc_date,expires,owner_name,due_date,visibility,period) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
    [tid, d.id, d.scope, d.ref, d.name, d.type, d.status, d.date, d.expires, d.owner, d.due, d.visibility, d.period || null]);
  for (const t of S.tasks) await c.query('INSERT INTO tasks (tenant_id,id,asset_id,title,owner_name,due_date,priority,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [tid, t.id, t.assetId, t.title, t.owner, t.due, t.priority, t.status]);
  for (const i of S.investors) await c.query('INSERT INTO investors (tenant_id,id,name,type,contact,holdings) VALUES ($1,$2,$3,$4,$5,$6)', [tid, i.id, i.name, i.type, i.contact, i.holdings]);
  for (const m of S.communications) await c.query('INSERT INTO communications (tenant_id,id,investor_id,at,direction,subject,internal) VALUES ($1,$2,$3,$4,$5,$6,$7)', [tid, m.id, m.investorId, m.at, m.direction, m.subject, m.internal]);
  for (const s of S.statements) {
    const inv = S.investors.find(i => i.id === s.investorId), snap = Calc.investorPeriod(S, inv, s.period);
    await c.query('INSERT INTO statements (tenant_id,id,investor_id,period,status,prepared_by,approved_by,snapshot,notes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [tid, s.id, s.investorId, s.period, s.status, s.preparedBy, s.approvedBy, JSON.stringify(snap), '[]']);
  }
  for (const l of [...S.audit].reverse()) await c.query('INSERT INTO audit_events (tenant_id,at,actor,action,entity,detail) VALUES ($1,$2,$3,$4,$5,$6)', [tid, l.at, l.actor, l.action, l.entity, l.detail]);
}

// What one investor may see. Built on the server from approved (Published) statements only.
function investorView(data, investorId) {
  const inv = data.investors.find(i => i.id === investorId); if (!inv) return null;
  const order = id => data.periods.findIndex(p => p.id === id), label = id => (data.periods.find(p => p.id === id) || {}).label || id;
  return {
    investor: { id: inv.id, name: inv.name, type: inv.type },
    statements: data.statements.filter(s => s.investorId === investorId && s.status === 'Published').sort((a, b) => order(a.period) - order(b.period))
      .map(s => ({ id: s.id, period: s.period, periodLabel: label(s.period), status: s.status, snapshot: s.snapshot, notes: s.notes || [] })),
    documents: data.documents.filter(d => d.scope === 'investor' && d.ref === investorId && d.visibility === 'investor' && d.status === 'Approved'),
    communications: data.communications.filter(c => c.investorId === investorId && !c.internal).sort((a, b) => b.at.localeCompare(a.at)),
    holdings: Object.entries(inv.holdings).map(([id, share]) => { const a = data.assets.find(x => x.id === id); return a ? { id, name: a.name, type: a.type, location: a.location, share } : null; }).filter(Boolean),
    // Only the investor's own configuration needed to format numbers; no other investor, no internal notes.
    config: { currency: data.config.currency, locale: data.config.locale },
  };
}

// ctx: { p, route, m, s, me, body, send, str, oneOf }
async function handle(ctx) {
  const { p, route, m, me, send, str, body } = ctx, tid = me.tenant_id, isAdmin = me.role === 'admin';
  const need = async () => { const d = await load(p, tid); if (!d) throw fail(404, 'No portfolio data yet for this agency. An admin can load the sample portfolio.'); return d; };
  const adminOnly = () => send(ctx.res, 403, { error: 'admins only' });
  const withTx = async fn => { const c = await p.connect(); try { await c.query('BEGIN'); const r = await fn(c); await c.query('COMMIT'); return r; } catch (e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); } };

  if (route === '/api/portfolio/investor-view' && m === 'GET') {
    const asked = ctx.query.get('investorId');
    let id;
    if (me.role === 'investor') { if (asked && asked !== me.investor_id) return send(ctx.res, 403, { error: 'you can only view your own portfolio' }); id = me.investor_id; }
    else { if (!asked) return send(ctx.res, 400, { error: 'investorId is required' }); id = asked; }
    const data = await need(), v = investorView(data, id);
    return v ? send(ctx.res, 200, v) : send(ctx.res, 404, { error: 'not found' });
  }
  if (me.role === 'investor') return send(ctx.res, 403, { error: 'not available to investor accounts' });

  if (route === '/api/portfolio/bootstrap' && m === 'GET') {
    const d = await load(p, tid);
    return send(ctx.res, 200, d ? { empty: false, ...d, me: { role: me.role, label: ROLE_LABEL[me.role], email: me.email, agency: me.agency } } : { empty: true, me: { role: me.role, label: ROLE_LABEL[me.role], email: me.email, agency: me.agency } });
  }
  if (route === '/api/portfolio/seed' && m === 'POST') {
    if (!isAdmin) return adminOnly();
    if ((await p.query('SELECT 1 FROM portfolio_config WHERE tenant_id=$1', [tid])).rowCount) return send(ctx.res, 409, { error: 'this agency already has portfolio data' });
    await withTx(async c => { await seed(c, tid); await audit(c, tid, me, 'Sample portfolio loaded', 'portfolio', 'Fictional sample dataset loaded'); });
    return send(ctx.res, 201, { ok: true });
  }
  if (route === '/api/portfolio/config' && m === 'PATCH') {
    if (!isAdmin) return adminOnly();
    const b = await body(ctx.req), d = await need(), cfg = d.config;
    if (b.currency !== undefined) { if (!CURRENCIES.includes(b.currency)) throw fail(400, 'unsupported currency'); cfg.currency = b.currency; }
    if (b.locale !== undefined) { if (!LOCALES.includes(b.locale)) throw fail(400, 'unsupported locale'); cfg.locale = b.locale; }
    if (b.targetYield !== undefined) { const v = Number(b.targetYield); if (!(v >= 0 && v <= 0.3)) throw fail(400, 'target yield must be between 0% and 30%'); cfg.targetYield = v; }
    await withTx(async c => { await c.query('UPDATE portfolio_config SET config=$2 WHERE tenant_id=$1', [tid, cfg]); await audit(c, tid, me, 'Configuration changed', 'config', `currency ${cfg.currency}, locale ${cfg.locale}, target yield ${(cfg.targetYield * 100).toFixed(2)}%`); });
    return send(ctx.res, 200, cfg);
  }

  let mt;
  if ((mt = route.match(/^\/api\/portfolio\/tasks\/([\w-]+)\/toggle$/)) && m === 'POST') {
    const r = await withTx(async c => {
      const t = (await c.query("UPDATE tasks SET status = CASE status WHEN 'Done' THEN 'Open' ELSE 'Done' END WHERE tenant_id=$1 AND id=$2 RETURNING id,asset_id,title,status", [tid, mt[1]])).rows[0];
      if (!t) throw fail(404, 'Task not found');
      await audit(c, tid, me, t.status === 'Done' ? 'Task completed' : 'Task reopened', t.asset_id, t.title); return t;
    });
    return send(ctx.res, 200, r);
  }
  if ((mt = route.match(/^\/api\/portfolio\/documents\/([\w-]+)\/review$/)) && m === 'POST') {
    if (!isAdmin) return adminOnly();
    const b = await body(ctx.req), dec = b.decision === 'approve' ? 'Approved' : b.decision === 'reject' ? 'Rejected' : null;
    if (!dec) throw fail(400, 'decision must be approve or reject');
    const r = await withTx(async c => {
      const d = (await c.query("UPDATE documents SET status=$3 WHERE tenant_id=$1 AND id=$2 AND status='Pending review' RETURNING id,ref,name", [tid, mt[1], dec])).rows[0];
      if (!d) throw fail(400, 'Document not found or not pending review');
      await audit(c, tid, me, dec === 'Approved' ? 'Document approved' : 'Document rejected', d.ref, d.name); return d;
    });
    return send(ctx.res, 200, r);
  }

  // Statements: prepare (any operator) -> submit -> decide (admin, and not the person who prepared it).
  if (route === '/api/portfolio/statements' && m === 'POST') {
    const b = await body(ctx.req), d = await need();
    const inv = d.investors.find(i => i.id === b.investorId), per = d.periods.find(x => x.id === b.period);
    if (!inv) throw fail(400, 'unknown investor'); if (!per) throw fail(400, 'unknown period');
    const ex = d.statements.find(s => s.investorId === inv.id && s.period === per.id);
    if (ex && ex.status === 'Published') throw fail(400, 'A statement for this investor and period is already published.');
    const snap = Calc.investorPeriod(d, inv, per.id), notes = [];
    snap.missingValuation.forEach(n => notes.push(`No valuation on file for ${n}; its value share is excluded.`));
    Calc.exceptions(d, per.id).filter(e => Object.keys(inv.holdings).includes(e.assetId) && e.type === 'Stale data').forEach(e => notes.push(e.title + '.'));
    const label = ROLE_LABEL[me.role];
    const id = await withTx(async c => {
      const sid = ex ? ex.id : nextId(d.statements, 'S');
      if (ex) await c.query("UPDATE statements SET status='Draft',snapshot=$3,notes=$4,prepared_by=$5,prepared_by_user=$6,approved_by=NULL,reviewed=false WHERE tenant_id=$1 AND id=$2", [tid, sid, JSON.stringify(snap), JSON.stringify(notes), label, me.id]);
      else await c.query("INSERT INTO statements (tenant_id,id,investor_id,period,status,prepared_by,prepared_by_user,snapshot,notes) VALUES ($1,$2,$3,$4,'Draft',$5,$6,$7,$8)", [tid, sid, inv.id, per.id, label, me.id, JSON.stringify(snap), JSON.stringify(notes)]);
      await audit(c, tid, me, 'Statement drafted', inv.id, `${per.id} statement generated from stored data`); return sid;
    });
    return send(ctx.res, 201, { id });
  }
  if ((mt = route.match(/^\/api\/portfolio\/statements\/([\w-]+)\/(submit|decide)$/)) && m === 'POST') {
    const b = await body(ctx.req), s = (await p.query('SELECT * FROM statements WHERE tenant_id=$1 AND id=$2', [tid, mt[1]])).rows[0];
    if (!s) throw fail(404, 'Statement not found');
    if (mt[2] === 'submit') {
      if (s.status !== 'Draft') throw fail(400, 'Only a draft can be submitted');
      if (b.acknowledged !== true) throw fail(400, 'Confirm that you have reviewed the data notes before submitting.');
      await withTx(async c => { await c.query("UPDATE statements SET status='In review',reviewed=true WHERE tenant_id=$1 AND id=$2", [tid, s.id]); await audit(c, tid, me, 'Statement submitted for review', s.investor_id, `${s.period} statement`); });
      return send(ctx.res, 200, { ok: true });
    }
    if (!isAdmin) return adminOnly();
    if (s.status !== 'In review') throw fail(400, 'Statement is not in review');
    if (s.prepared_by_user === me.id) throw fail(400, 'Maker/checker rule: the person who prepared a statement cannot approve it.');
    const approve = b.decision === 'approve';
    if (!approve && b.decision !== 'return') throw fail(400, 'decision must be approve or return');
    await withTx(async c => {
      await c.query('UPDATE statements SET status=$3, approved_by=$4 WHERE tenant_id=$1 AND id=$2', [tid, s.id, approve ? 'Published' : 'Draft', approve ? me.email : null]);
      await audit(c, tid, me, approve ? 'Statement approved' : 'Statement returned', s.investor_id, `${s.period} statement ${approve ? 'approved and published to the investor view' : 'returned to draft'}`);
    });
    return send(ctx.res, 200, { ok: true });
  }

  // Assets: create with validation (any operator); valuation update (admin).
  if (route === '/api/portfolio/assets' && m === 'POST') {
    const b = await body(ctx.req), d = await need(), errs = [];
    const name = str(b.name, 120), type = str(b.type, 60), location = str(b.location, 120), unit = ['units', 'sqm'].includes(b.unit) ? b.unit : 'units';
    const cost = Number(b.cost), capacity = Number(b.capacity ?? 0), gpr = Number(b.gpr ?? 0), other = Number(b.other ?? 0), acquired = isoDate(b.acquired);
    if (!name) errs.push('name is required'); if (!type) errs.push('type is required');
    if (!d.portfolios.some(x => x.id === b.portfolio)) errs.push('portfolio must be an existing portfolio');
    if (!(cost > 0)) errs.push('acquisition cost must be a positive number'); if (!acquired) errs.push('acquired must be a date (YYYY-MM-DD)');
    if (!(capacity >= 0)) errs.push('capacity must be 0 or more'); if (!(gpr >= 0) || !(other >= 0)) errs.push('rent and other income must be 0 or more');
    const status = STATUSES.includes(b.status) ? b.status : 'Stabilised';
    const opex = {}; for (const k of ['maintenance', 'utilities', 'management', 'taxInsurance']) { const v = Number(b.opex?.[k] ?? 0); if (!(v >= 0)) errs.push(`opex ${k} must be 0 or more`); opex[k] = v; }
    let occ = b.occupancy ?? Array(d.months.length).fill(0);
    if (!Array.isArray(occ) || occ.length !== d.months.length || occ.some(o => !(Number(o) >= 0 && Number(o) <= 1))) errs.push(`occupancy must be ${d.months.length} values between 0 and 1`); else occ = occ.map(Number);
    if (errs.length) throw fail(400, errs.join('; '));
    const id = nextId(d.assets, 'A');
    await withTx(async c => {
      await c.query(`INSERT INTO assets (tenant_id,id,portfolio_id,name,type,location,status,capacity,unit,acquired,cost,gpr,other_income,opex,occupancy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
        [tid, id, b.portfolio, name, type, location, status, capacity, unit, acquired, cost, gpr, other, JSON.stringify(opex), JSON.stringify(occ)]);
      await audit(c, tid, me, 'Asset created', id, `${name} (${type}); no valuation yet`);
    });
    return send(ctx.res, 201, { id });
  }
  if ((mt = route.match(/^\/api\/portfolio\/assets\/([\w-]+)\/valuation$/)) && m === 'POST') {
    if (!isAdmin) return adminOnly();
    const b = await body(ctx.req), v = Number(b.value), date = isoDate(b.date), source = str(b.source, 120);
    if (!(v > 0)) throw fail(400, 'valuation must be a positive number'); if (!date) throw fail(400, 'valuation date must be YYYY-MM-DD'); if (!source) throw fail(400, 'valuation source is required');
    await withTx(async c => {
      const a = (await c.query('UPDATE assets SET valuation_value=$3,valuation_date=$4,valuation_source=$5 WHERE tenant_id=$1 AND id=$2 RETURNING name,id', [tid, mt[1], v, date, source])).rows[0];
      if (!a) throw fail(404, 'Asset not found');
      await audit(c, tid, me, 'Valuation recorded', a.id, `${a.name}: ${v} as at ${date} (${source})`);
    });
    return send(ctx.res, 200, { ok: true });
  }
  return false;
}
module.exports = { handle, seed, load, investorView, ROLE_LABEL };
