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

CREATE TABLE IF NOT EXISTS calls (
  id         SERIAL PRIMARY KEY,
  tenant_id  INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id    INT REFERENCES users(id) ON DELETE SET NULL,
  lead_name  TEXT NOT NULL DEFAULT '',
  lang       TEXT NOT NULL DEFAULT 'en' CHECK (lang IN ('en','ar')),
  outcome    TEXT NOT NULL DEFAULT '',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at   TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS calls_tenant_idx ON calls (tenant_id, id DESC);
CREATE TABLE IF NOT EXISTS call_turns (
  id         SERIAL PRIMARY KEY,
  call_id    INT NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
  tenant_id  INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('user','assistant')),
  text       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS call_turns_call_idx ON call_turns (call_id, id);

CREATE TABLE IF NOT EXISTS invites (
  id          SERIAL PRIMARY KEY,
  tenant_id   INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('admin','agent')),
  token_hash  TEXT NOT NULL UNIQUE,
  expires_at  TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lead intake: notes + normalised keys used for duplicate detection (generated, so they can never drift).
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT '';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone_key TEXT GENERATED ALWAYS AS (
  CASE WHEN length(regexp_replace(phone, '\D', '', 'g')) >= 7 THEN right(regexp_replace(phone, '\D', '', 'g'), 9) ELSE '' END) STORED;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email_key TEXT GENERATED ALWAYS AS (lower(email)) STORED;
CREATE INDEX IF NOT EXISTS leads_phone_key_idx ON leads (tenant_id, phone_key) WHERE phone_key <> '';
CREATE INDEX IF NOT EXISTS leads_email_key_idx ON leads (tenant_id, email_key) WHERE email_key <> '';

CREATE TABLE IF NOT EXISTS integrations (
  id           SERIAL PRIMARY KEY,
  tenant_id    INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  adapter      TEXT NOT NULL,
  label        TEXT NOT NULL,
  key_hash     TEXT NOT NULL UNIQUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  received     INT NOT NULL DEFAULT 0
);
