/**
 * Gumroad Commerce Connector (SKELETON - NOT IMPLEMENTED)
 * Implements CommerceConnector interface for Gumroad platform
 *
 * TODO: Implement OAuth/token storage
 * TODO: Map Gumroad API endpoints
 * TODO: Implement customer management
 * TODO: Implement product/license management
 * TODO: Implement sale retrieval
 */
import { Action, ActionResult } from '@aj/agent-core';
import { CommerceConnector, ConnectorConfig, HealthCheckResult } from './interface.js';
export declare class GumroadConnector implements CommerceConnector {
    readonly platform = "gumroad";
    private config;
    initialize(config: ConnectorConfig): Promise<void>;
    healthCheck(): Promise<HealthCheckResult>;
    executeAction(action: Action): Promise<ActionResult>;
    executeActions(actions: Action[]): Promise<ActionResult[]>;
    supportsAction(actionType: string): boolean;
    getMetadata(): {
        name: string;
        version: string;
        capabilities: never[];
        configured: boolean;
    };
}
