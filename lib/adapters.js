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
const registry = { [webhook.id]: webhook };

// Same rule as the generated columns in db/schema.sql.
const phoneKey = p => { const d = String(p || '').replace(/\D/g, ''); return d.length >= 7 ? d.slice(-9) : ''; };
const emailKey = e => String(e || '').trim().toLowerCase();

module.exports = { registry, phoneKey, emailKey };
