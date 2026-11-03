// Database smoke test: creates a table, inserts a row, reads it back. Works against any Postgres (Neon / Lakebase / local).
// Run: DATABASE_URL=postgres://... node scripts/db-smoke.js     (or: npm run db:smoke)
// Prints the result and the server version only. It never prints the connection string or credentials.
const { Pool } = require('pg');

const url = process.env.DATABASE_URL;
if (!url) { console.error('Set DATABASE_URL (a Postgres connection string). Nothing was run.'); process.exit(1); }
// TLS is on unless the host is local, same rule as lib/db.js.
const local = /@(localhost|127\.0\.0\.1)|^postgres(ql)?:\/\/\/|host=\/|sslmode=disable/.test(url);
const pool = new Pool({ connectionString: url, max: 1, ssl: local ? false : { rejectUnauthorized: true } });

(async () => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS smoke_test (id SERIAL PRIMARY KEY, note TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())');
    const note = 'hello from observer ' + new Date().toISOString();
    const ins = await pool.query('INSERT INTO smoke_test (note) VALUES ($1) RETURNING id', [note]);
    const row = (await pool.query('SELECT id, note, created_at FROM smoke_test WHERE id = $1', [ins.rows[0].id])).rows[0];
    const ver = (await pool.query('SHOW server_version')).rows[0].server_version;
    const count = (await pool.query('SELECT count(*)::int AS n FROM smoke_test')).rows[0].n;
    console.log(JSON.stringify({ ok: true, serverVersion: ver, inserted: { id: row.id, note: row.note, createdAt: row.created_at }, rowsInTable: count }, null, 2));
  } catch (e) {
    console.error('Smoke test failed: ' + e.message); // message only; no connection details
    process.exitCode = 1;
  } finally { await pool.end(); }
})();
