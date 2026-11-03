// Lead-source adapters.
//
// Contract: { id, label, kind, normalize(raw, ctx) -> leadInput | null }
//   kind 'push': an external system POSTs to /api/intake/:key and `normalize` maps each raw record to our lead shape.
//   kind 'pull' (not shipped yet): would add `async pull(config, since) -> raw[]`, run on a schedule, and feed the same
//   normalize + upsertLeads path, so a HubSpot/Salesforce adapter only needs `pull` + `normalize`.
// `ctx.defaultSource` is the integration's label (e.g. "Bayut"), used when the record names no source.

const pick = (o, keys) => { for (const k of keys) { const v = o[k]; if (v !== undefined && v !== null && String(v).trim() !== '') return v; } return ''; };
const norm = o => Object.fromEntries(Object.entries(o || {}).map(([k, v]) => [k.toLowerCase().replace(/[\s-]+/g, '_'), v]));

const webhook = {
  id: 'webhook', label: 'Generic webhook (JSON)', kind: 'push',
  // Accepts the field names portals and ad platforms commonly use.
  normalize(raw, ctx = {}) {
    const r = norm(raw);
    const name = String(pick(r, ['name', 'full_name', 'fullname', 'customer_name', 'lead_name', 'contact_name'])
      || [r.first_name, r.last_name].filter(Boolean).join(' ')).trim();
    let budget = pick(r, ['budget', 'price', 'max_price', 'max_budget']);
    if (typeof budget === 'number') budget = 'AED ' + budget.toLocaleString('en-US');
    const purpose = String(pick(r, ['type', 'lead_type', 'purpose', 'intent'])).toLowerCase();
    return {
      name,
      phone: pick(r, ['phone', 'mobile', 'phone_number', 'mobile_number', 'whatsapp', 'contact_number', 'tel']),
      email: pick(r, ['email', 'email_address']),
      budget, area: pick(r, ['area', 'location', 'community', 'preferred_area', 'city']),
      source: pick(r, ['source', 'portal', 'channel', 'utm_source']) || ctx.defaultSource || 'Webhook',
      type: /sell|owner|list/.test(purpose) ? 'Seller' : 'Buyer',
      notes: pick(r, ['message', 'notes', 'comment', 'comments', 'enquiry', 'inquiry']),
      timeframe: pick(r, ['timeframe', 'timeline']), financing: pick(r, ['financing', 'payment']),
    };
  },
};

// ── HubSpot (pull) ───────────────────────────────────────────────────
// Reads contacts through the CRM v3 API with a private-app access token (scope: crm.objects.contacts.read).
// Read-only: nothing is ever written to HubSpot. Base URL is overridable by env for tests only.
const HS_PROPS = ['firstname', 'lastname', 'email', 'phone', 'mobilephone', 'city', 'lifecyclestage', 'message'];
const HS_STAGE = { marketingqualifiedlead: 'Qualified', salesqualifiedlead: 'Qualified', opportunity: 'Offer Stage', customer: 'Closed Won', evangelist: 'Closed Won' };
const fail = (code, message) => Object.assign(new Error(message), { code });

const hubspot = {
  id: 'hubspot', label: 'HubSpot contacts (pull)', kind: 'pull',
  fields: [{ key: 'token', label: 'Private app access token', secret: true }],
  // Fetches up to `pages` pages starting at `cursor` (HubSpot's `after`). Returns { records, cursor, done, limited }.
  // cursor is null when the whole list has been read. A 429 returns what was read so far instead of failing.
  async pull(cfg, { cursor = null, pages = 10, limit = 100, baseUrl = process.env.HUBSPOT_API_URL || 'https://api.hubapi.com', fetchFn = fetch } = {}) {
    const records = []; let after = cursor, limited = false;
    for (let i = 0; i < pages; i++) {
      const u = new URL('/crm/v3/objects/contacts', baseUrl);
      u.searchParams.set('limit', String(limit)); u.searchParams.set('properties', HS_PROPS.join(','));
      if (after) u.searchParams.set('after', after);
      let r;
      try { r = await fetchFn(u, { headers: { authorization: 'Bearer ' + cfg.token } }); }
      catch { throw fail(502, 'could not reach HubSpot'); }
      if (r.status === 401 || r.status === 403) throw fail(400, 'HubSpot rejected the token (the private app needs the crm.objects.contacts.read scope)');
      if (r.status === 429) { limited = true; break; }
      if (!r.ok) throw fail(502, 'HubSpot returned an error (' + r.status + ')');
      const j = await r.json().catch(() => null);
      if (!j || !Array.isArray(j.results)) throw fail(502, 'unexpected response from HubSpot');
      records.push(...j.results);
      after = j.paging?.next?.after ?? null;
      if (!after) break;
    }
    return { records, cursor: after, done: !after && !limited, limited };
  },
  normalize(raw, ctx = {}) {
    const p = norm(raw.properties), email = String(p.email || '').trim();
    const name = [p.firstname, p.lastname].filter(Boolean).join(' ').trim() || email.split('@')[0];
    const phone = String(p.phone || p.mobilephone || '').trim();
    if (!name && !phone) return null; // nothing to identify the person by
    return {
      external_id: raw.id ? 'hubspot:' + raw.id : '',
      name: name || phone, phone, email, area: p.city || '', source: ctx.defaultSource || 'HubSpot', type: 'Buyer',
      status: HS_STAGE[String(p.lifecyclestage || '').toLowerCase()] || 'New',
      notes: [p.message, raw.id ? 'HubSpot contact #' + raw.id : ''].filter(Boolean).join(' · '),
    };
  },
};
const registry = { [webhook.id]: webhook, [hubspot.id]: hubspot };

// Same rule as the generated columns in db/schema.sql.
const phoneKey = p => { const d = String(p || '').replace(/\D/g, ''); return d.length >= 7 ? d.slice(-9) : ''; };
const emailKey = e => String(e || '').trim().toLowerCase();

module.exports = { registry, phoneKey, emailKey };
