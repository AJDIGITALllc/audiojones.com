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
export class GumroadConnector {
    constructor() {
        this.platform = 'gumroad';
        this.config = null;
        // TODO: Implement OAuth flow
        // async authenticateOAuth(code: string): Promise<{ accessToken: string; refreshToken: string }> {
        //   throw new Error('OAuth not implemented');
        // }
        // TODO: Implement token refresh
        // async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
        //   throw new Error('Token refresh not implemented');
        // }
        // TODO: Implement Gumroad API client
        // private async callGumroadAPI(endpoint: string, options?: RequestInit): Promise<any> {
        //   // Gumroad API base: https://api.gumroad.com/v2
        //   throw new Error('API client not implemented');
        // }
        // TODO: Map actions to Gumroad API endpoints
        // - GET /products - List products
        // - GET /sales - List sales
        // - POST /licenses/verify - Verify a license
        // - etc.
    }
    async initialize(config) {
        this.config = config;
        console.log('[GumroadConnector] Initialized (stub mode - not implemented)');
    }
    async healthCheck() {
        return {
            healthy: false,
            message: 'Gumroad connector not implemented yet',
            details: {
                status: 'stub',
                implementation: 'pending',
            },
        };
    }
    async executeAction(action) {
        // TODO: Implement actual Gumroad API calls
        return {
            success: false,
            action,
            error: 'Not implemented: Gumroad connector is a stub',
            executedAt: new Date().toISOString(),
        };
    }
    async executeActions(actions) {
        // TODO: Implement batch execution
        return actions.map(action => ({
            success: false,
            action,
            error: 'Not implemented: Gumroad connector is a stub',
            executedAt: new Date().toISOString(),
        }));
    }
    supportsAction(actionType) {
        // TODO: Define supported actions once implemented
        // Expected: create_customer, get_customer, list_payments, etc.
        return false;
    }
    getMetadata() {
        return {
            name: 'Gumroad Commerce Connector',
            version: '0.1.0-stub',
            capabilities: [
            // TODO: Add capabilities once implemented
            // 'customer_management',
            // 'license_management',
            // 'sale_retrieval',
            ],
            configured: false,
        };
    }
}
