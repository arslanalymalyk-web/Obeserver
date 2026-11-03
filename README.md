# Observer

## Portfolio & Investor Operations: concept prototype

Open `public/demo/index.html` in a browser (no server, install or network needed). Fictional sample data throughout; see [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) for what is simulated, what is not implemented and what production would need. Served by the Observer server and signed in, the same prototype switches to connected mode (per-agency Postgres data, server-enforced roles, investor accounts). Optional lead-engagement simulation: `public/demo/voice.html`. Tests: `npm run test:demo`, `npm test` (needs `DATABASE_URL`), `test/browser/*` (Playwright).

## Brokerage lead-management app (separate track, demo backend)

Real-estate lead platform and AI voice-agent mockups with a small multi-tenant backend. See `docs/architecture.md`.

```bash
npm install
cp .env.example .env   # fill in, then export the variables
node server.js         # http://localhost:3000 -> sign up on /login.html
npm test               # needs DATABASE_URL pointing at a Postgres
```

Deploy on Vercel: set `DATABASE_URL`, `SESSION_SECRET`, `ANTHROPIC_API_KEY` and deploy. `vercel.json` routes `/api/*` to `api/index.js`.
