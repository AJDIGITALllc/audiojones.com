/**
 * Execution Engine
 * Routes actions to platform-specific connectors
 */
/**
 * Connector registry
 */
export class ConnectorRegistry {
    constructor() {
        this.connectors = new Map();
    }
    register(platform, connector) {
        this.connectors.set(platform, connector);
    }
    get(platform) {
        return this.connectors.get(platform);
    }
    has(platform) {
        return this.connectors.has(platform);
    }
    list() {
        return Array.from(this.connectors.keys());
    }
}
/**
 * Execution Engine
 * Routes actions to appropriate connectors
 */
export class ExecutionEngine {
    constructor(registry) {
        this.registry = registry;
    }
    /**
     * Execute a plan by routing actions to their respective connectors
     */
    async executePlan(plan) {
        const startTime = Date.now();
        const results = [];
        // Group actions by platform
        const actionsByPlatform = this.groupActionsByPlatform(plan.actions);
        // Execute actions for each platform
        for (const [platform, actions] of actionsByPlatform.entries()) {
            const connector = this.registry.get(platform);
            if (!connector) {
                // Add error results for unsupported platform
                results.push(...actions.map((action) => ({
                    success: false,
                    action,
                    error: `No connector registered for platform: ${platform}`,
                    executedAt: new Date().toISOString(),
                })));
                continue;
            }
            // Execute actions via connector
            try {
                const platformResults = await connector.executeActions(actions);
                results.push(...platformResults);
            }
            catch (error) {
                // Add error results if connector fails
                results.push(...actions.map((action) => ({
                    success: false,
                    action,
                    error: error instanceof Error ? error.message : String(error),
                    executedAt: new Date().toISOString(),
                })));
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
    async executeAction(action) {
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
        }
        catch (error) {
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
    groupActionsByPlatform(actions) {
        const groups = new Map();
        for (const action of actions) {
            const platform = action.platform;
            if (!groups.has(platform)) {
                groups.set(platform, []);
            }
            groups.get(platform).push(action);
        }
        return groups;
    }
}
