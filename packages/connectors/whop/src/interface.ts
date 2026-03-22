/**
 * CommerceConnector Interface
 * Defines the contract for all commerce platform connectors
 */

import { Action, ActionResult } from '@aj/agent-core';

/**
 * Configuration for a commerce connector
 */
export interface ConnectorConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  timeout?: number;
  metadata?: Record<string, any>;
}

/**
 * Health check result
 */
export interface HealthCheckResult {
  healthy: boolean;
  message: string;
  details?: Record<string, any>;
}

/**
 * CommerceConnector interface
 * All platform connectors must implement this interface
 */
export interface CommerceConnector {
  /**
   * Platform name
   */
  readonly platform: string;
  
  /**
   * Initialize the connector with configuration
   */
  initialize(config: ConnectorConfig): Promise<void>;
  
  /**
   * Check if the connector is properly configured and healthy
   */
  healthCheck(): Promise<HealthCheckResult>;
  
  /**
   * Execute a single action
   */
  executeAction(action: Action): Promise<ActionResult>;
  
  /**
   * Execute multiple actions with optional transaction support
   */
  executeActions(actions: Action[]): Promise<ActionResult[]>;
  
  /**
   * Check if an action type is supported
   */
  supportsAction(actionType: string): boolean;
  
  /**
   * Get connector metadata
   */
  getMetadata(): {
    name: string;
    version: string;
    capabilities: string[];
    configured: boolean;
  };
}
