/**
 * Intent-to-Plan Compiler
 * Converts natural language prompts into structured action plans
 */
import { Plan } from './dsl/v1/types.js';
import { PlanInput } from './planner.js';
/**
 * Compile a natural language intent into a structured plan
 * This is a simplified implementation - in production, this would call OpenAI or similar
 */
export declare function compilePlanFromIntent(input: PlanInput): Promise<Plan>;
