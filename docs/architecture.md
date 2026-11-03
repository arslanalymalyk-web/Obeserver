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
| POST | `/api/integrations/:id/sync` | admin only: run one sync pass of a pull integration (up to 10 pages / 1000 contacts; press again to continue from the saved cursor) |
| POST | `/api/intake/:key` | public, key-authenticated: one lead or a list (max 200) in JSON; flexible field names; dedupes |
| POST/GET | `/api/calls`, GET `/api/calls/:id` | create/list/read saved voice calls and transcripts |
| POST | `/api/calls/:id/say`, `/api/calls/:id/end` | one agent turn (server-side prompt, EN/AR, history from DB); `text:""` connects the call |
| POST | `/api/claude` | session-gated proxy, model and max_tokens fixed server-side |

## Lead sources (adapters)
`lib/adapters.js` defines the contract: `{ id, label, kind, normalize(raw, ctx) }`. The shipped adapter is a generic push webhook (`kind: 'push'`) that maps common portal/ad-platform field names (name/full_name, phone/mobile/whatsapp, email, budget/price, area/location/community, message/notes, ...) and uses the integration's label as the lead source. 
**HubSpot (pull, read-only)** is the first CRM connector. An admin pastes a private-app access token (scope `crm.objects.contacts.read`); it is checked against HubSpot immediately, then stored AES-256-GCM encrypted (`DATA_KEY`, falling back to `SESSION_SECRET`) and never returned by the API. **Sync now** reads contacts via `GET /crm/v3/objects/contacts` (paged with `after`), maps name/phone/email/city/message, maps `lifecyclestage` to a pipeline stage (MQL/SQL -> Qualified, opportunity -> Offer Stage, customer -> Closed Won, else New), and merges through `upsertLeads`. Each contact carries a stable `external_id` (`hubspot:<id>`), so re-syncing never duplicates, even contacts with no phone or email. A pass handles up to 1000 contacts and saves its cursor in the same transaction as the leads; HubSpot rate limits (429) return partial progress to resume. Existing leads only get blank fields filled, so later edits in HubSpot do not overwrite Observer. Nothing is written back to HubSpot.

**Verification status:** built from HubSpot's documented CRM v3 API and tested against a mock server that follows that response shape. It has **not** been run against a real HubSpot account (the build environment cannot reach api.hubapi.com). Treat the first real sync as the acceptance test.

**Duplicates:** matched by phone (last 9 digits, so `+971 50 111 2233` equals `050 111 2233`) or email (case-insensitive), via generated columns `phone_key`/`email_key`. A match fills the existing lead's empty fields and never overwrites. Applies to webhooks and CSV import, including duplicates inside one batch. Manual "Add lead" does not dedupe.

## Portfolio & investor operations (connected mode of `public/demo/`)
Tenant-scoped tables (`portfolio_config`, `portfolios`, `assets`, `leases`, `documents`, `tasks`, `investors`, `communications`, `statements`, `audit_events`) seeded from `public/demo/js/data.js`. `lib/portfolio.js` serves `/api/portfolio/*`: `GET bootstrap` (operators), `GET investor-view` (investor accounts get only their own approved data; operators can preview), `POST seed|assets|assets/:id/valuation|statements|statements/:id/submit|decide|tasks/:id/toggle|documents/:id/review`, `PATCH config`. Roles: `admin` = Approver, `agent` = Analyst, `investor` = one investor only; investor accounts are blocked from every other endpoint. Statement snapshots use the same pure `calc.js` as the browser. `audit_events` is append-only (trigger). The front end (`public/demo/js/store.js`) auto-detects connected vs standalone mode.

## Configuration
See `.env.example`. `DATABASE_URL`, `SESSION_SECRET` (32+ chars) are required; `ANTHROPIC_API_KEY` enables the copilot.

## Known limits / next
- Rate limits are in memory (per instance).
- Roles are enforced server-side, and re-read from the database on every request (a demotion or removal takes effect immediately). `admin`: everything, incl. team, lead delete and CSV import. `agent`: read/create/edit leads and use the voice demo; sees only their own calls.
- Invites are shared as links (no email is sent). No password reset flow yet.
- Pipeline kanban, funnel, ROI and the voice agent views still use mock data; the Leads view, scoring queue, hot leads and detail modal use real leads.
- Voice demo (Live Voice Demo view): browser SpeechRecognition (`ar-AE`/`en-US`) -> `/api/calls/:id/say` -> Claude -> browser speechSynthesis. No telephony. Recognition needs Chrome/Edge; Arabic speech needs an Arabic voice installed (text still works). The queue console, scripts and analytics views remain mock.
- The webhook key is in the URL path, so reverse proxies may log it; revoke and recreate if it leaks.
- Syncs are manual (button); there is no scheduler yet. Changes made in HubSpot after import are not pulled in (blank fields only).
- Next: scheduled sync, password reset, email delivery for invites.
