/**
 * AI Planner for generating validated action plans
 * Platform-agnostic - no direct platform API imports
 */
import { Plan } from './dsl/v1/types.js';
/**
 * Input for plan generation
 */
export interface PlanInput {
    /**
     * User's natural language intent/prompt
     */
    prompt: string;
    /**
     * Optional context for better planning
     */
    context?: {
        userId?: string;
        platform?: string;
        metadata?: Record<string, any>;
    };
    /**
     * Optional constraints
     */
    constraints?: {
        maxActions?: number;
        allowedPlatforms?: string[];
        dryRun?: boolean;
    };
}
/**
 * Result of plan generation
 */
export interface PlanOutput {
    success: boolean;
    plan?: Plan;
    error?: string;
    validationErrors?: string[];
}
/**
 * Generate a validated plan from user input
 * This is the main entry point for the agent-core
 */
export declare function planFromPrompt(input: PlanInput): Promise<PlanOutput>;
/**
 * Validate a pre-built plan
 */
export declare function validateExistingPlan(plan: unknown): PlanOutput;
