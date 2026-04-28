// Lead persistence for the Applied Intelligence diagnostic.
//
// Canonical store: Neon (Postgres) via @neondatabase/serverless. The schema
// is db/migrations/001_applied_intelligence_leads.sql.
//
// Falls back to Firestore when DATABASE_URL is unset, so existing
// environments that haven't been provisioned for Neon yet still capture
// leads against the same field names.

import "server-only";
import { createHash, randomUUID } from "node:crypto";
import type { AppliedIntelligenceLeadInput } from "./lead-schema";
import type { LeadScores } from "./lead-scoring";

export type StoredLead = {
  id: string;
  createdAt: string;
};

export type LeadContext = {
  ipHash: string | null;
  userAgent: string | null;
};

const FIRESTORE_COLLECTION = "applied_intelligence_leads";

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "audio-jones-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

type LeadRow = ReturnType<typeof buildRow>;

function buildRow(
  id: string,
  createdAt: string,
  input: AppliedIntelligenceLeadInput,
  scores: LeadScores,
  ctx: LeadContext,
) {
  return {
    id,
    first_name: input.firstName,
    last_name: input.lastName ?? null,
    email: input.email,
    phone: input.phone ?? null,
    company_name: input.companyName ?? null,
    website: input.website || null,
    role: input.role ?? null,

    annual_revenue_range: input.annualRevenueRange ?? null,
    primary_constraint: input.primaryConstraint ?? null,
    current_growth_stage: input.currentGrowthStage ?? null,
    biggest_pain: input.biggestPain ?? null,
    what_have_you_tried: input.whatHaveYouTried ?? null,

    crm_used: input.crmUsed ?? null,
    analytics_used: input.analyticsUsed ?? null,
    project_management_used: input.projectManagementUsed ?? null,
    automation_tools_used: input.automationToolsUsed ?? null,
    content_system_status: input.contentSystemStatus ?? null,
    documented_sops: input.documentedSops ?? null,

    current_ai_tools: input.currentAiTools ?? null,
    ai_usage_level: input.aiUsageLevel ?? null,
    ai_main_goal: input.aiMainGoal ?? null,
    ai_concern: input.aiConcern ?? null,

    can_identify_best_lead_source: input.canIdentifyBestLeadSource ?? null,
    knows_cac: input.knowsCAC ?? null,
    knows_ltv: input.knowsLTV ?? null,
    tracks_conversion_source: input.tracksConversionSource ?? null,
    attribution_confidence: input.attributionConfidence ?? null,
    desired_outcome: input.desiredOutcome ?? null,

    budget_range: input.budgetRange ?? null,
    timeline: input.timeline ?? null,
    preferred_contact_method: input.preferredContactMethod ?? null,
    consent_to_contact: input.consentToContact === true,

    signal_score: scores.signalScore,
    ai_readiness_score: scores.aiReadinessScore,
    attribution_score: scores.attributionScore,
    icp_fit_score: scores.icpFitScore,
    total_score: scores.totalScore,
    priority: scores.priority,
    status: "new" as const,

    source_page: input.sourcePage ?? null,
    utm_source: input.utmSource ?? null,
    utm_medium: input.utmMedium ?? null,
    utm_campaign: input.utmCampaign ?? null,
    utm_term: input.utmTerm ?? null,
    utm_content: input.utmContent ?? null,

    user_agent: ctx.userAgent,
    ip_hash: ctx.ipHash,

    created_at: createdAt,
    updated_at: createdAt,
  };
}

async function insertNeon(row: LeadRow): Promise<void> {
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    INSERT INTO applied_intelligence_leads (
      id, first_name, last_name, email, phone, company_name, website, role,
      annual_revenue_range, primary_constraint, current_growth_stage,
      biggest_pain, what_have_you_tried,
      crm_used, analytics_used, project_management_used, automation_tools_used,
      content_system_status, documented_sops,
      current_ai_tools, ai_usage_level, ai_main_goal, ai_concern,
      can_identify_best_lead_source, knows_cac, knows_ltv,
      tracks_conversion_source, attribution_confidence, desired_outcome,
      budget_range, timeline, preferred_contact_method, consent_to_contact,
      signal_score, ai_readiness_score, attribution_score, icp_fit_score,
      total_score, priority, status,
      source_page, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      user_agent, ip_hash, created_at, updated_at
    ) VALUES (
      ${row.id}, ${row.first_name}, ${row.last_name}, ${row.email}, ${row.phone},
      ${row.company_name}, ${row.website}, ${row.role},
      ${row.annual_revenue_range}, ${row.primary_constraint},
      ${row.current_growth_stage}, ${row.biggest_pain}, ${row.what_have_you_tried},
      ${row.crm_used}, ${row.analytics_used}, ${row.project_management_used},
      ${row.automation_tools_used}, ${row.content_system_status},
      ${row.documented_sops},
      ${row.current_ai_tools}, ${row.ai_usage_level}, ${row.ai_main_goal},
      ${row.ai_concern},
      ${row.can_identify_best_lead_source}, ${row.knows_cac}, ${row.knows_ltv},
      ${row.tracks_conversion_source}, ${row.attribution_confidence},
      ${row.desired_outcome},
      ${row.budget_range}, ${row.timeline}, ${row.preferred_contact_method},
      ${row.consent_to_contact},
      ${row.signal_score}, ${row.ai_readiness_score}, ${row.attribution_score},
      ${row.icp_fit_score}, ${row.total_score}, ${row.priority}, ${row.status},
      ${row.source_page}, ${row.utm_source}, ${row.utm_medium},
      ${row.utm_campaign}, ${row.utm_term}, ${row.utm_content},
      ${row.user_agent}, ${row.ip_hash}, ${row.created_at}, ${row.updated_at}
    )
  `;
}

async function insertFirestore(row: LeadRow): Promise<void> {
  const { getFirestoreDb } = await import("@/lib/shared/firebaseAdmin");
  const dbInstance = getFirestoreDb();
  await dbInstance.collection(FIRESTORE_COLLECTION).doc(row.id).set(row);
}

export async function persistAppliedIntelligenceLead(
  input: AppliedIntelligenceLeadInput,
  scores: LeadScores,
  ctx: LeadContext,
): Promise<StoredLead> {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const row = buildRow(id, createdAt, input, scores, ctx);

  const useNeon = Boolean(process.env.DATABASE_URL);

  try {
    if (useNeon) {
      await insertNeon(row);
    } else {
      await insertFirestore(row);
    }
  } catch (err) {
    console.error("[applied-intelligence] failed to persist lead", {
      backend: useNeon ? "neon" : "firestore",
      error: err instanceof Error ? err.message : String(err),
      leadId: id,
      email: input.email,
    });
    throw err;
  }

  return { id, createdAt };
}
