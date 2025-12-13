/**
 * Whop API Client
 * Low-level API client for Whop platform
 */
export function createWhopClient(apiKey, baseUrl = "https://api.whop.com") {
    const baseFetch = (path, init = {}) => {
        return fetch(`${baseUrl}${path}`, {
            ...init,
            headers: {
                ...(init.headers || {}),
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
    };
    return {
        fetch: baseFetch,
        users: {
            getUser: async ({ userId }) => {
                const response = await baseFetch(`/v2/users/${userId}`);
                return response.json();
            },
            getCurrentUser: async () => {
                const response = await baseFetch("/v2/me");
                return response.json();
            },
        },
        payments: {
            list: async (params = {}) => {
                const searchParams = new URLSearchParams();
                if (params.company_id)
                    searchParams.set("company_id", params.company_id);
                if (params.limit)
                    searchParams.set("limit", params.limit.toString());
                if (params.page)
                    searchParams.set("page", params.page.toString());
                const response = await baseFetch(`/v2/payments?${searchParams}`);
                return response.json();
            },
            get: async (paymentId) => {
                const response = await baseFetch(`/v2/payments/${paymentId}`);
                return response.json();
            },
        },
        subscriptions: {
            list: async (params = {}) => {
                const searchParams = new URLSearchParams();
                if (params.company_id)
                    searchParams.set("company_id", params.company_id);
                if (params.limit)
                    searchParams.set("limit", params.limit.toString());
                if (params.page)
                    searchParams.set("page", params.page.toString());
                const response = await baseFetch(`/v2/subscriptions?${searchParams}`);
                return response.json();
            },
            get: async (subscriptionId) => {
                const response = await baseFetch(`/v2/subscriptions/${subscriptionId}`);
                return response.json();
            },
        },
        access: {
            checkIfUserHasAccessToExperience: async ({ experienceId, userId }) => {
                const response = await baseFetch(`/v2/access/experiences/${experienceId}/users/${userId}`);
                return response.json();
            },
        },
        notifications: {
            create: async (params) => {
                const response = await baseFetch("/v2/notifications", {
                    method: "POST",
                    body: JSON.stringify(params),
                });
                return response.json();
            },
        },
    };
}
