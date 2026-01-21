/**
 * Whop API Client
 * Low-level API client for Whop platform
 */
export interface WhopClient {
    fetch: (path: string, init?: RequestInit) => Promise<Response>;
    users: {
        getUser: (params: {
            userId: string;
        }) => Promise<any>;
        getCurrentUser: () => Promise<any>;
    };
    payments: {
        list: (params?: {
            company_id?: string;
            limit?: number;
            page?: number;
        }) => Promise<any>;
        get: (paymentId: string) => Promise<any>;
    };
    subscriptions: {
        list: (params?: {
            company_id?: string;
            limit?: number;
            page?: number;
        }) => Promise<any>;
        get: (subscriptionId: string) => Promise<any>;
    };
    access: {
        checkIfUserHasAccessToExperience: (params: {
            experienceId: string;
            userId: string;
        }) => Promise<any>;
    };
    notifications: {
        create: (params: {
            experience_id?: string;
            company_id?: string;
            title: string;
            content: string;
            rest_path?: string;
        }) => Promise<any>;
    };
}
export declare function createWhopClient(apiKey: string, baseUrl?: string): WhopClient;
