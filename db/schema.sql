-- Idempotent; run on every cold start by lib/db.js.
CREATE TABLE IF NOT EXISTS tenants (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  tenant_id  INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email      TEXT NOT NULL UNIQUE,
  pw_hash    TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('admin','agent')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS leads (
  id         SERIAL PRIMARY KEY,
  tenant_id  INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL DEFAULT '',
  email      TEXT NOT NULL DEFAULT '',
  score      INT  NOT NULL DEFAULT 50 CHECK (score BETWEEN 0 AND 100),
  temp       TEXT NOT NULL DEFAULT 'warm' CHECK (temp IN ('hot','warm','cold')),
  type       TEXT NOT NULL DEFAULT 'Buyer',
  source     TEXT NOT NULL DEFAULT '',
  budget     TEXT NOT NULL DEFAULT '',
  timeframe  TEXT NOT NULL DEFAULT '',
  financing  TEXT NOT NULL DEFAULT '',
  agent      TEXT NOT NULL DEFAULT 'Unassigned',
  status     TEXT NOT NULL DEFAULT 'New',
  intent     TEXT NOT NULL DEFAULT 'buyer',
  urgency    TEXT NOT NULL DEFAULT 'researching',
  area       TEXT NOT NULL DEFAULT '',
  photo      TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_tenant_idx ON leads (tenant_id, id);
