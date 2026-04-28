-- Audio Jones Applied Intelligence diagnostic — canonical schema.
--
-- Apply against any Postgres-compatible target (Neon, Supabase, RDS).
-- This is the source of truth for column names and types; alternate stores
-- (Firestore today) mirror these field names.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM (
    'new',
    'reviewed',
    'qualified',
    'contacted',
    'booked',
    'closed_won',
    'closed_lost',
    'spam'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE lead_priority AS ENUM (
    'low',
    'medium',
    'high',
    'urgent'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS applied_intelligence_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  website TEXT,
  role TEXT,

  annual_revenue_range TEXT,
  primary_constraint TEXT,
  current_growth_stage TEXT,
  biggest_pain TEXT,
  what_have_you_tried TEXT,

  crm_used TEXT,
  analytics_used TEXT,
  project_management_used TEXT,
  automation_tools_used TEXT,
  content_system_status TEXT,
  documented_sops BOOLEAN,

  current_ai_tools TEXT,
  ai_usage_level TEXT,
  ai_main_goal TEXT,
  ai_concern TEXT,

  can_identify_best_lead_source BOOLEAN,
  knows_cac BOOLEAN,
  knows_ltv BOOLEAN,
  tracks_conversion_source BOOLEAN,
  attribution_confidence INTEGER,
  desired_outcome TEXT,

  budget_range TEXT,
  timeline TEXT,
  preferred_contact_method TEXT,
  consent_to_contact BOOLEAN DEFAULT FALSE,

  signal_score INTEGER DEFAULT 0,
  ai_readiness_score INTEGER DEFAULT 0,
  attribution_score INTEGER DEFAULT 0,
  icp_fit_score INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,

  status lead_status DEFAULT 'new',
  priority lead_priority DEFAULT 'medium',

  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  user_agent TEXT,
  ip_hash TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applied_intelligence_leads_email
  ON applied_intelligence_leads(email);

CREATE INDEX IF NOT EXISTS idx_applied_intelligence_leads_status
  ON applied_intelligence_leads(status);

CREATE INDEX IF NOT EXISTS idx_applied_intelligence_leads_priority
  ON applied_intelligence_leads(priority);

CREATE INDEX IF NOT EXISTS idx_applied_intelligence_leads_created_at
  ON applied_intelligence_leads(created_at DESC);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_applied_intelligence_leads_updated_at
  ON applied_intelligence_leads;

CREATE TRIGGER trg_applied_intelligence_leads_updated_at
BEFORE UPDATE ON applied_intelligence_leads
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
