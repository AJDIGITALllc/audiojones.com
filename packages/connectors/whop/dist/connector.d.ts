/**
 * Whop Commerce Connector
 * Implements CommerceConnector interface for Whop platform
 */
import { Action, ActionResult } from '@aj/agent-core';
import { CommerceConnector, ConnectorConfig, HealthCheckResult } from './interface.js';
export declare class WhopConnector implements CommerceConnector {
    readonly platform = "whop";
    private client;
    private config;
    private isStubMode;
    initialize(config: ConnectorConfig): Promise<void>;
    healthCheck(): Promise<HealthCheckResult>;
    executeAction(action: Action): Promise<ActionResult>;
    executeActions(actions: Action[]): Promise<ActionResult[]>;
    supportsAction(actionType: string): boolean;
    getMetadata(): {
        name: string;
        version: string;
        capabilities: string[];
        configured: boolean;
    };
    /**
     * Map DSL action to Whop API call
     */
    private mapActionToAPI;
}
