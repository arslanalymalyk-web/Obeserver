const fs = require('fs'), path = require('path');
const { Pool } = require('pg');
let pool, ready;
// DATABASE_URL: any Postgres (Neon / Vercel Postgres / local). TLS is used unless the host is local.
function getPool() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    const local = /@(localhost|127\.0\.0\.1)|^postgres(ql)?:\/\/\/|host=\/|sslmode=disable/.test(url);
    pool = new Pool({ connectionString: url, max: 3, ssl: local ? false : { rejectUnauthorized: true } });
  }
  return pool;
}
async function db() {
  const p = getPool();
  ready = ready || p.query(fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf8')).catch(e => { ready = null; throw e; });
  await ready;
  return p;
}
module.exports = { db, close: () => pool && pool.end() };
