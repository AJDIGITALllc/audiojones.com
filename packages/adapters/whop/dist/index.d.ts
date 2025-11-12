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
    forumPosts: {
        create: (params: {
            experience_id: string;
            content: string;
            pinned?: boolean;
        }) => Promise<any>;
    };
    messages: {
        create: (params: {
            channel_id: string;
            content: string;
        }) => Promise<any>;
    };
    verifyUserToken: (headers: Headers) => Promise<{
        userId: string;
    }>;
}
export declare function getWhopClient(): WhopClient;
export declare function verifyWhopSignature(rawBody: string, signature: string): void;
export type WhopWebhookEvent = {
    type: string;
    data: any;
    created_at: string;
    id: string;
};
export declare function parseWhopWebhook(rawBody: string, signature: string): WhopWebhookEvent;
//# sourceMappingURL=index.d.ts.map