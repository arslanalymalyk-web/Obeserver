# Observer architecture (milestone 2)

## Shape
- **Static front end** in `public/` (platform, voice agent, login). No build step.
- **One API router** (`lib/router.js`) used by Vercel (`api/index.js`, via a rewrite in `vercel.json`) and by `server.js` for local or Node-host runs.
- **Postgres** through `pg`. `db/schema.sql` is idempotent and applied on cold start.

## Multi-tenancy
Every business row carries `tenant_id`. The tenant comes only from the signed session, never from the request body. Every query on `leads` filters by it, so a lead id from another tenant returns 404 (covered in `test/api.test.js`). Signup creates a tenant and its first `admin` user.

## Auth
Email + password (scrypt). Session is an HMAC-signed, HttpOnly, SameSite=Lax cookie (7 days) holding user id, tenant id and role. Writes also require a same-origin `Origin` and a JSON content type. Signup/login are rate-limited per IP.

## API
| Method | Path | Notes |
|---|---|---|
| POST | `/api/auth/signup` | `{email,password,agency,seed_demo}` |
| POST | `/api/auth/login`, `/api/auth/logout` | |
| GET | `/api/auth/me` | |
| GET/POST | `/api/leads` | |
| PATCH/DELETE | `/api/leads/:id` | |
| POST | `/api/leads/import` | `{csv}`, max 1MB / 2000 rows, header names match lead fields |
| GET/POST | `/api/users`, `/api/users/invite` | admin only: list team + pending invites, create a single-use 7-day invite (raw token returned once, only its hash is stored) |
| PATCH/DELETE | `/api/users/:id`, `/api/invites/:id` | admin only: change role / remove / revoke. Cannot remove yourself or demote the last admin |
| GET/POST | `/api/auth/invite`, `/api/auth/accept` | public: look up an invite, set a password and join |
| GET/POST/DELETE | `/api/integrations`, `/api/integrations/:id` | admin only: create/list/revoke lead-intake webhooks (key shown once, only its hash stored) |
| POST | `/api/intake/:key` | public, key-authenticated: one lead or a list (max 200) in JSON; flexible field names; dedupes |
| POST/GET | `/api/calls`, GET `/api/calls/:id` | create/list/read saved voice calls and transcripts |
| POST | `/api/calls/:id/say`, `/api/calls/:id/end` | one agent turn (server-side prompt, EN/AR, history from DB); `text:""` connects the call |
| POST | `/api/claude` | session-gated proxy, model and max_tokens fixed server-side |

## Lead sources (adapters)
`lib/adapters.js` defines the contract: `{ id, label, kind, normalize(raw, ctx) }`. The shipped adapter is a generic push webhook (`kind: 'push'`) that maps common portal/ad-platform field names (name/full_name, phone/mobile/whatsapp, email, budget/price, area/location/community, message/notes, ...) and uses the integration's label as the lead source. A pull-style CRM adapter (HubSpot, Salesforce) would add `pull(config, since)` and reuse `normalize` and `upsertLeads`. No third-party CRM adapter is implemented yet.

**Duplicates:** matched by phone (last 9 digits, so `+971 50 111 2233` equals `050 111 2233`) or email (case-insensitive), via generated columns `phone_key`/`email_key`. A match fills the existing lead's empty fields and never overwrites. Applies to webhooks and CSV import, including duplicates inside one batch. Manual "Add lead" does not dedupe.

## Configuration
See `.env.example`. `DATABASE_URL`, `SESSION_SECRET` (32+ chars) are required; `ANTHROPIC_API_KEY` enables the copilot.

## Known limits / next
- Rate limits are in memory (per instance).
- Roles are enforced server-side, and re-read from the database on every request (a demotion or removal takes effect immediately). `admin`: everything, incl. team, lead delete and CSV import. `agent`: read/create/edit leads and use the voice demo; sees only their own calls.
- Invites are shared as links (no email is sent). No password reset flow yet.
- Pipeline kanban, funnel, ROI and the voice agent views still use mock data; the Leads view, scoring queue, hot leads and detail modal use real leads.
- Voice demo (Live Voice Demo view): browser SpeechRecognition (`ar-AE`/`en-US`) -> `/api/calls/:id/say` -> Claude -> browser speechSynthesis. No telephony. Recognition needs Chrome/Edge; Arabic speech needs an Arabic voice installed (text still works). The queue console, scripts and analytics views remain mock.
- The webhook key is in the URL path, so reverse proxies may log it; revoke and recreate if it leaks.
- Next: a real pull adapter (HubSpot), password reset, email delivery for invites.
