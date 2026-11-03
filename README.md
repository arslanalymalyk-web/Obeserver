# Observer

Real-estate lead platform and AI voice-agent mockups with a small multi-tenant backend. See `docs/architecture.md`.

```bash
npm install
cp .env.example .env   # fill in, then export the variables
node server.js         # http://localhost:3000 -> sign up on /login.html
npm test               # needs DATABASE_URL pointing at a Postgres
```

Deploy on Vercel: set `DATABASE_URL`, `SESSION_SECRET`, `ANTHROPIC_API_KEY` and deploy. `vercel.json` routes `/api/*` to `api/index.js`.
