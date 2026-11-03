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

-- Pull-style integrations (e.g. HubSpot): encrypted credentials + sync progress.
ALTER TABLE integrations ADD COLUMN IF NOT EXISTS config_enc   TEXT NOT NULL DEFAULT '';
ALTER TABLE integrations ADD COLUMN IF NOT EXISTS cursor       TEXT;
ALTER TABLE integrations ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMPTZ;
ALTER TABLE integrations ADD COLUMN IF NOT EXISTS last_error   TEXT NOT NULL DEFAULT '';

-- Stable id from the source system (e.g. 'hubspot:51'), so re-syncing never duplicates a contact that has no phone/email.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS external_id TEXT;
CREATE INDEX IF NOT EXISTS leads_external_idx ON leads (tenant_id, external_id) WHERE external_id IS NOT NULL;

-- ═══ Portfolio & investor operations (tenant-scoped) ═══
ALTER TABLE users   ADD COLUMN IF NOT EXISTS investor_id TEXT;
ALTER TABLE invites ADD COLUMN IF NOT EXISTS investor_id TEXT;
ALTER TABLE users   DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users   ADD  CONSTRAINT users_role_check   CHECK (role IN ('admin','agent','investor'));
ALTER TABLE invites DROP CONSTRAINT IF EXISTS invites_role_check;
ALTER TABLE invites ADD  CONSTRAINT invites_role_check CHECK (role IN ('admin','agent','investor'));

CREATE TABLE IF NOT EXISTS portfolio_config (
  tenant_id INT PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  config JSONB NOT NULL, months JSONB NOT NULL, periods JSONB NOT NULL
);
CREATE TABLE IF NOT EXISTS portfolios (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, name TEXT NOT NULL, strategy TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS assets (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, portfolio_id TEXT NOT NULL,
  name TEXT NOT NULL, type TEXT NOT NULL, location TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'Stabilised',
  capacity NUMERIC NOT NULL DEFAULT 0, unit TEXT NOT NULL DEFAULT 'units', acquired DATE NOT NULL, cost NUMERIC NOT NULL CHECK (cost > 0),
  valuation_value NUMERIC, valuation_date DATE, valuation_source TEXT, target_yield NUMERIC, internal_note TEXT NOT NULL DEFAULT '',
  gpr NUMERIC NOT NULL DEFAULT 0, other_income NUMERIC NOT NULL DEFAULT 0, opex JSONB NOT NULL DEFAULT '{}', occupancy JSONB NOT NULL DEFAULT '[]', one_off JSONB NOT NULL DEFAULT '{}',
  PRIMARY KEY (tenant_id, id), FOREIGN KEY (tenant_id, portfolio_id) REFERENCES portfolios (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS leases (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id SERIAL, asset_id TEXT NOT NULL, tenant_name TEXT NOT NULL, space TEXT NOT NULL DEFAULT '', lease_end DATE NOT NULL, note TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS documents (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, scope TEXT NOT NULL CHECK (scope IN ('asset','investor')), ref TEXT NOT NULL,
  name TEXT NOT NULL, type TEXT NOT NULL, status TEXT NOT NULL, doc_date DATE, expires DATE, owner_name TEXT NOT NULL DEFAULT '', due_date DATE,
  visibility TEXT NOT NULL DEFAULT 'internal' CHECK (visibility IN ('internal','investor')), period TEXT,
  PRIMARY KEY (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS tasks (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, asset_id TEXT NOT NULL, title TEXT NOT NULL, owner_name TEXT NOT NULL DEFAULT '',
  due_date DATE, priority TEXT NOT NULL DEFAULT 'Medium', status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open','Done')),
  PRIMARY KEY (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS investors (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL DEFAULT '', contact TEXT NOT NULL DEFAULT '', holdings JSONB NOT NULL DEFAULT '{}',
  PRIMARY KEY (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS communications (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, investor_id TEXT NOT NULL, at DATE NOT NULL, direction TEXT NOT NULL, subject TEXT NOT NULL, internal BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (tenant_id, id)
);
CREATE TABLE IF NOT EXISTS statements (
  tenant_id INT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE, id TEXT NOT NULL, investor_id TEXT NOT NULL, period TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Draft','In review','Published')), prepared_by TEXT NOT NULL DEFAULT '', prepared_by_user INT, approved_by TEXT,
  snapshot JSONB, notes JSONB NOT NULL DEFAULT '[]', reviewed BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (tenant_id, id), UNIQUE (tenant_id, investor_id, period)
);
CREATE TABLE IF NOT EXISTS audit_events (
  id BIGSERIAL PRIMARY KEY, tenant_id INT NOT NULL REFERENCES tenants(id), at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor TEXT NOT NULL, action TEXT NOT NULL, entity TEXT NOT NULL, detail TEXT NOT NULL DEFAULT '', user_id INT
);
CREATE INDEX IF NOT EXISTS audit_events_tenant_idx ON audit_events (tenant_id, at DESC);
-- Append-only: the database itself refuses edits and deletes of audit rows.
CREATE OR REPLACE FUNCTION audit_events_immutable() RETURNS trigger AS $$ BEGIN RAISE EXCEPTION 'audit_events is append-only'; END; $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS audit_events_no_change ON audit_events;
CREATE TRIGGER audit_events_no_change BEFORE UPDATE OR DELETE ON audit_events FOR EACH ROW EXECUTE FUNCTION audit_events_immutable();
