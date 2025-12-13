/**
 * Execution Engine
 * Routes actions to platform-specific connectors
 */
import { Plan, Action, ActionResult, PlanResult } from './dsl/v1/types.js';
/**
 * Connector interface (minimal definition for executor)
 */
export interface Connector {
    readonly platform: string;
    executeAction(action: Action): Promise<ActionResult>;
    executeActions(actions: Action[]): Promise<ActionResult[]>;
}
/**
 * Connector registry
 */
export declare class ConnectorRegistry {
    private connectors;
    register(platform: string, connector: Connector): void;
    get(platform: string): Connector | undefined;
    has(platform: string): boolean;
    list(): string[];
}
/**
 * Execution Engine
 * Routes actions to appropriate connectors
 */
export declare class ExecutionEngine {
    private registry;
    constructor(registry: ConnectorRegistry);
    /**
     * Execute a plan by routing actions to their respective connectors
     */
    executePlan(plan: Plan): Promise<PlanResult>;
    /**
     * Execute a single action
     */
    executeAction(action: Action): Promise<ActionResult>;
    /**
     * Group actions by platform for efficient execution
     */
    private groupActionsByPlatform;
}
