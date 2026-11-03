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
| POST/GET | `/api/calls`, GET `/api/calls/:id` | create/list/read saved voice calls and transcripts |
| POST | `/api/calls/:id/say`, `/api/calls/:id/end` | one agent turn (server-side prompt, EN/AR, history from DB); `text:""` connects the call |
| POST | `/api/claude` | session-gated proxy, model and max_tokens fixed server-side |

## Configuration
See `.env.example`. `DATABASE_URL`, `SESSION_SECRET` (32+ chars) are required; `ANTHROPIC_API_KEY` enables the copilot.

## Known limits / next
- Rate limits are in memory (per instance).
- Roles exist (`admin`/`agent`) but are not enforced beyond tenant scoping yet; no invite flow for more users.
- Pipeline kanban, funnel, ROI and the voice agent views still use mock data; the Leads view, scoring queue, hot leads and detail modal use real leads.
- Voice demo (Live Voice Demo view): browser SpeechRecognition (`ar-AE`/`en-US`) -> `/api/calls/:id/say` -> Claude -> browser speechSynthesis. No telephony. Recognition needs Chrome/Edge; Arabic speech needs an Arabic voice installed (text still works). The queue console, scripts and analytics views remain mock.
- Next: user invites with role enforcement, CRM adapter interface.
