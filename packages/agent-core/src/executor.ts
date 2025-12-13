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
export class ConnectorRegistry {
  private connectors = new Map<string, Connector>();

  register(platform: string, connector: Connector): void {
    this.connectors.set(platform, connector);
  }

  get(platform: string): Connector | undefined {
    return this.connectors.get(platform);
  }

  has(platform: string): boolean {
    return this.connectors.has(platform);
  }

  list(): string[] {
    return Array.from(this.connectors.keys());
  }
}

/**
 * Execution Engine
 * Routes actions to appropriate connectors
 */
export class ExecutionEngine {
  constructor(private registry: ConnectorRegistry) {}

  /**
   * Execute a plan by routing actions to their respective connectors
   */
  async executePlan(plan: Plan): Promise<PlanResult> {
    const startTime = Date.now();
    const results: ActionResult[] = [];

    // Group actions by platform
    const actionsByPlatform = this.groupActionsByPlatform(plan.actions);

    // Execute actions for each platform
    for (const [platform, actions] of actionsByPlatform.entries()) {
      const connector = this.registry.get(platform);

      if (!connector) {
        // Add error results for unsupported platform
        results.push(
          ...actions.map((action) => ({
            success: false,
            action,
            error: `No connector registered for platform: ${platform}`,
            executedAt: new Date().toISOString(),
          }))
        );
        continue;
      }

      // Execute actions via connector
      try {
        const platformResults = await connector.executeActions(actions);
        results.push(...platformResults);
      } catch (error) {
        // Add error results if connector fails
        results.push(
          ...actions.map((action) => ({
            success: false,
            action,
            error: error instanceof Error ? error.message : String(error),
            executedAt: new Date().toISOString(),
          }))
        );
      }
    }

    const duration = Date.now() - startTime;
    const success = results.every((r) => r.success);

    return {
      planId: plan.id,
      success,
      results,
      executedAt: new Date().toISOString(),
      duration,
    };
  }

  /**
   * Execute a single action
   */
  async executeAction(action: Action): Promise<ActionResult> {
    const connector = this.registry.get(action.platform);

    if (!connector) {
      return {
        success: false,
        action,
        error: `No connector registered for platform: ${action.platform}`,
        executedAt: new Date().toISOString(),
      };
    }

    try {
      return await connector.executeAction(action);
    } catch (error) {
      return {
        success: false,
        action,
        error: error instanceof Error ? error.message : String(error),
        executedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Group actions by platform for efficient execution
   */
  private groupActionsByPlatform(actions: Action[]): Map<string, Action[]> {
    const groups = new Map<string, Action[]>();

    for (const action of actions) {
      const platform = action.platform;
      if (!groups.has(platform)) {
        groups.set(platform, []);
      }
      groups.get(platform)!.push(action);
    }

    return groups;
  }
}
