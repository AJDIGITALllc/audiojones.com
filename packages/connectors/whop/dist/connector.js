/**
 * Whop Commerce Connector
 * Implements CommerceConnector interface for Whop platform
 */
import { createWhopClient } from './client.js';
export class WhopConnector {
    constructor() {
        this.platform = 'whop';
        this.client = null;
        this.config = null;
        this.isStubMode = false;
    }
    async initialize(config) {
        this.config = config;
        // If no API key, run in stub mode
        if (!config.apiKey) {
            this.isStubMode = true;
            console.warn('[WhopConnector] No API key provided - running in STUB mode');
            return;
        }
        this.client = createWhopClient(config.apiKey, config.baseUrl);
        this.isStubMode = false;
    }
    async healthCheck() {
        if (this.isStubMode) {
            return {
                healthy: true,
                message: 'Whop connector running in STUB mode',
                details: { mode: 'stub' },
            };
        }
        if (!this.client) {
            return {
                healthy: false,
                message: 'Whop connector not initialized',
            };
        }
        try {
            // Try to fetch current user to verify API key
            await this.client.users.getCurrentUser();
            return {
                healthy: true,
                message: 'Whop connector is healthy',
                details: { mode: 'real' },
            };
        }
        catch (error) {
            return {
                healthy: false,
                message: 'Whop API health check failed',
                details: { error: error instanceof Error ? error.message : String(error) },
            };
        }
    }
    async executeAction(action) {
        const startTime = Date.now();
        // Stub mode - return fake success
        if (this.isStubMode) {
            return {
                success: true,
                action,
                data: { stub: true, message: 'Action executed in stub mode' },
                executedAt: new Date().toISOString(),
            };
        }
        if (!this.client) {
            return {
                success: false,
                action,
                error: 'Whop connector not initialized',
                executedAt: new Date().toISOString(),
            };
        }
        try {
            const data = await this.mapActionToAPI(action);
            return {
                success: true,
                action,
                data,
                executedAt: new Date().toISOString(),
            };
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
    async executeActions(actions) {
        // Execute actions sequentially (no transaction support yet)
        const results = [];
        for (const action of actions) {
            const result = await this.executeAction(action);
            results.push(result);
            // Stop on first failure
            if (!result.success) {
                break;
            }
        }
        return results;
    }
    supportsAction(actionType) {
        const supportedActions = [
            'get_customer',
            'list_payments',
            'get_payment',
            'list_subscriptions',
            'get_subscription',
            'check_access',
            'send_notification',
        ];
        return supportedActions.includes(actionType);
    }
    getMetadata() {
        return {
            name: 'Whop Commerce Connector',
            version: '1.0.0',
            capabilities: [
                'customer_management',
                'payment_retrieval',
                'subscription_management',
                'access_control',
                'notifications',
            ],
            configured: this.client !== null || this.isStubMode,
        };
    }
    /**
     * Map DSL action to Whop API call
     */
    async mapActionToAPI(action) {
        if (!this.client) {
            throw new Error('Client not initialized');
        }
        switch (action.type) {
            case 'get_customer':
                return await this.client.users.getUser({
                    userId: action.parameters.customerId,
                });
            case 'list_payments':
                return await this.client.payments.list({
                    limit: action.parameters.limit,
                    page: action.parameters.page,
                    company_id: this.config?.metadata?.companyId,
                });
            case 'get_payment':
                return await this.client.payments.get(action.parameters.paymentId);
            case 'list_subscriptions':
                return await this.client.subscriptions.list({
                    limit: action.parameters.limit,
                    page: action.parameters.page,
                    company_id: this.config?.metadata?.companyId,
                });
            case 'get_subscription':
                return await this.client.subscriptions.get(action.parameters.subscriptionId);
            case 'check_access':
                return await this.client.access.checkIfUserHasAccessToExperience({
                    experienceId: action.parameters.resourceId,
                    userId: action.parameters.userId,
                });
            case 'send_notification':
                return await this.client.notifications.create({
                    company_id: this.config?.metadata?.companyId,
                    title: action.parameters.title,
                    content: action.parameters.content,
                });
            default:
                throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
}
