/**
 * Agent Core - Platform-agnostic AI planning and validation
 * Zero platform-specific dependencies
 */

export { planFromPrompt, validateExistingPlan } from './planner.js';
export type { PlanInput, PlanOutput } from './planner.js';

export { ExecutionEngine, ConnectorRegistry } from './executor.js';
export type { Connector } from './executor.js';

// Re-export DSL types and schemas for convenience
export * from './dsl/v1/index.js';
