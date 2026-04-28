// Lead persistence for the Applied Intelligence diagnostic.
//
// The canonical schema is the Neon SQL migration in db/migrations/. In this
// repo the production database is Firestore, so we persist there and mirror
// the SQL column names as Firestore field names. To swap to Neon, point
// `persistAppliedIntelligenceLead` at a Postgres client using DATABASE_URL.

import "server-only";
import { createHash } from "node:crypto";
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

const COLLECTION = "applied_intelligence_leads";

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "audio-jones-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function persistAppliedIntelligenceLead(
  input: AppliedIntelligenceLeadInput,
  scores: LeadScores,
  ctx: LeadContext,
): Promise<StoredLead> {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const createdAt = new Date().toISOString();

  const doc = {
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

  try {
    const { getFirestoreDb } = await import("@/lib/shared/firebaseAdmin");
    const dbInstance = getFirestoreDb();
    await dbInstance.collection(COLLECTION).doc(id).set(doc);
  } catch (err) {
    // Firestore not configured in this environment. Log so the lead is not
    // silently dropped, then re-throw so the API route returns a 500 and the
    // form can surface the error rather than pretending to succeed.
    console.error("[applied-intelligence] failed to persist lead", {
      error: err instanceof Error ? err.message : String(err),
      leadId: id,
      email: input.email,
    });
    throw err;
  }

  return { id, createdAt };
}
