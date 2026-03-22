/**
 * Zod schemas for Universal Action DSL v1
 * Provides runtime validation for all action types
 */
import { z } from 'zod';
/**
 * Platform schema
 */
export declare const PlatformSchema: z.ZodEnum<["whop", "gumroad"]>;
/**
 * Action type schema - must be whitelisted
 */
export declare const ActionTypeSchema: z.ZodEnum<["create_customer", "get_customer", "update_customer", "list_payments", "get_payment", "list_subscriptions", "get_subscription", "cancel_subscription", "check_access", "grant_access", "revoke_access", "send_notification"]>;
/**
 * Base action schema
 */
export declare const BaseActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    type: z.ZodEnum<["create_customer", "get_customer", "update_customer", "list_payments", "get_payment", "list_subscriptions", "get_subscription", "cancel_subscription", "check_access", "grant_access", "revoke_access", "send_notification"]>;
    parameters: z.ZodRecord<z.ZodString, z.ZodAny>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "create_customer" | "get_customer" | "update_customer" | "list_payments" | "get_payment" | "list_subscriptions" | "get_subscription" | "cancel_subscription" | "check_access" | "grant_access" | "revoke_access" | "send_notification";
    parameters: Record<string, any>;
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "create_customer" | "get_customer" | "update_customer" | "list_payments" | "get_payment" | "list_subscriptions" | "get_subscription" | "cancel_subscription" | "check_access" | "grant_access" | "revoke_access" | "send_notification";
    parameters: Record<string, any>;
    idempotencyKey?: string | undefined;
}>;
/**
 * Customer management action schemas
 */
export declare const CreateCustomerActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"create_customer">;
    parameters: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }, {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "create_customer";
    parameters: {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "create_customer";
    parameters: {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const GetCustomerActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"get_customer">;
    parameters: z.ZodObject<{
        customerId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        customerId: string;
    }, {
        customerId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "get_customer";
    parameters: {
        customerId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "get_customer";
    parameters: {
        customerId: string;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const UpdateCustomerActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"update_customer">;
    parameters: z.ZodObject<{
        customerId: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }, {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "update_customer";
    parameters: {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "update_customer";
    parameters: {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
/**
 * Payment management action schemas
 */
export declare const ListPaymentsActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"list_payments">;
    parameters: z.ZodObject<{
        limit: z.ZodOptional<z.ZodNumber>;
        page: z.ZodOptional<z.ZodNumber>;
        customerId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "list_payments";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "list_payments";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const GetPaymentActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"get_payment">;
    parameters: z.ZodObject<{
        paymentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paymentId: string;
    }, {
        paymentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "get_payment";
    parameters: {
        paymentId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "get_payment";
    parameters: {
        paymentId: string;
    };
    idempotencyKey?: string | undefined;
}>;
/**
 * Subscription management action schemas
 */
export declare const ListSubscriptionsActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"list_subscriptions">;
    parameters: z.ZodObject<{
        limit: z.ZodOptional<z.ZodNumber>;
        page: z.ZodOptional<z.ZodNumber>;
        customerId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "list_subscriptions";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "list_subscriptions";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const GetSubscriptionActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"get_subscription">;
    parameters: z.ZodObject<{
        subscriptionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        subscriptionId: string;
    }, {
        subscriptionId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "get_subscription";
    parameters: {
        subscriptionId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "get_subscription";
    parameters: {
        subscriptionId: string;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const CancelSubscriptionActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"cancel_subscription">;
    parameters: z.ZodObject<{
        subscriptionId: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        subscriptionId: string;
        reason?: string | undefined;
    }, {
        subscriptionId: string;
        reason?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "cancel_subscription";
    parameters: {
        subscriptionId: string;
        reason?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "cancel_subscription";
    parameters: {
        subscriptionId: string;
        reason?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
/**
 * Access management action schemas
 */
export declare const CheckAccessActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"check_access">;
    parameters: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        resourceId: string;
    }, {
        userId: string;
        resourceId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "check_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "check_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const GrantAccessActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"grant_access">;
    parameters: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
        expiresAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    }, {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "grant_access";
    parameters: {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "grant_access";
    parameters: {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
export declare const RevokeAccessActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"revoke_access">;
    parameters: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        resourceId: string;
    }, {
        userId: string;
        resourceId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "revoke_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "revoke_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}>;
/**
 * Notification action schema
 */
export declare const SendNotificationActionSchema: z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"send_notification">;
    parameters: z.ZodObject<{
        userId: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        content: z.ZodString;
        channel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    }, {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "send_notification";
    parameters: {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "send_notification";
    parameters: {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}>;
/**
 * Union schema for all actions
 */
export declare const ActionSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"create_customer">;
    parameters: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }, {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "create_customer";
    parameters: {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "create_customer";
    parameters: {
        email: string;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"get_customer">;
    parameters: z.ZodObject<{
        customerId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        customerId: string;
    }, {
        customerId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "get_customer";
    parameters: {
        customerId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "get_customer";
    parameters: {
        customerId: string;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"update_customer">;
    parameters: z.ZodObject<{
        customerId: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }, {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "update_customer";
    parameters: {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "update_customer";
    parameters: {
        customerId: string;
        email?: string | undefined;
        name?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"list_payments">;
    parameters: z.ZodObject<{
        limit: z.ZodOptional<z.ZodNumber>;
        page: z.ZodOptional<z.ZodNumber>;
        customerId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "list_payments";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "list_payments";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"get_payment">;
    parameters: z.ZodObject<{
        paymentId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paymentId: string;
    }, {
        paymentId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "get_payment";
    parameters: {
        paymentId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "get_payment";
    parameters: {
        paymentId: string;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"list_subscriptions">;
    parameters: z.ZodObject<{
        limit: z.ZodOptional<z.ZodNumber>;
        page: z.ZodOptional<z.ZodNumber>;
        customerId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }, {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "list_subscriptions";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "list_subscriptions";
    parameters: {
        customerId?: string | undefined;
        limit?: number | undefined;
        page?: number | undefined;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"get_subscription">;
    parameters: z.ZodObject<{
        subscriptionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        subscriptionId: string;
    }, {
        subscriptionId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "get_subscription";
    parameters: {
        subscriptionId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "get_subscription";
    parameters: {
        subscriptionId: string;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"cancel_subscription">;
    parameters: z.ZodObject<{
        subscriptionId: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        subscriptionId: string;
        reason?: string | undefined;
    }, {
        subscriptionId: string;
        reason?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "cancel_subscription";
    parameters: {
        subscriptionId: string;
        reason?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "cancel_subscription";
    parameters: {
        subscriptionId: string;
        reason?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"check_access">;
    parameters: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        resourceId: string;
    }, {
        userId: string;
        resourceId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "check_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "check_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"grant_access">;
    parameters: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
        expiresAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    }, {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "grant_access";
    parameters: {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "grant_access";
    parameters: {
        userId: string;
        resourceId: string;
        expiresAt?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"revoke_access">;
    parameters: z.ZodObject<{
        userId: z.ZodString;
        resourceId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        resourceId: string;
    }, {
        userId: string;
        resourceId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "revoke_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "revoke_access";
    parameters: {
        userId: string;
        resourceId: string;
    };
    idempotencyKey?: string | undefined;
}>, z.ZodObject<{
    platform: z.ZodEnum<["whop", "gumroad"]>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
} & {
    type: z.ZodLiteral<"send_notification">;
    parameters: z.ZodObject<{
        userId: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        content: z.ZodString;
        channel: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    }, {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    platform: "whop" | "gumroad";
    type: "send_notification";
    parameters: {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}, {
    platform: "whop" | "gumroad";
    type: "send_notification";
    parameters: {
        title: string;
        content: string;
        userId?: string | undefined;
        channel?: string | undefined;
    };
    idempotencyKey?: string | undefined;
}>]>;
/**
 * Action result schema
 */
export declare const ActionResultSchema: z.ZodObject<{
    success: z.ZodBoolean;
    action: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"create_customer">;
        parameters: z.ZodObject<{
            email: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }, {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"get_customer">;
        parameters: z.ZodObject<{
            customerId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            customerId: string;
        }, {
            customerId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"update_customer">;
        parameters: z.ZodObject<{
            customerId: z.ZodString;
            email: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }, {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"list_payments">;
        parameters: z.ZodObject<{
            limit: z.ZodOptional<z.ZodNumber>;
            page: z.ZodOptional<z.ZodNumber>;
            customerId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"get_payment">;
        parameters: z.ZodObject<{
            paymentId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            paymentId: string;
        }, {
            paymentId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"list_subscriptions">;
        parameters: z.ZodObject<{
            limit: z.ZodOptional<z.ZodNumber>;
            page: z.ZodOptional<z.ZodNumber>;
            customerId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"get_subscription">;
        parameters: z.ZodObject<{
            subscriptionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            subscriptionId: string;
        }, {
            subscriptionId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"cancel_subscription">;
        parameters: z.ZodObject<{
            subscriptionId: z.ZodString;
            reason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            subscriptionId: string;
            reason?: string | undefined;
        }, {
            subscriptionId: string;
            reason?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"check_access">;
        parameters: z.ZodObject<{
            userId: z.ZodString;
            resourceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            resourceId: string;
        }, {
            userId: string;
            resourceId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"grant_access">;
        parameters: z.ZodObject<{
            userId: z.ZodString;
            resourceId: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        }, {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"revoke_access">;
        parameters: z.ZodObject<{
            userId: z.ZodString;
            resourceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            resourceId: string;
        }, {
            userId: string;
            resourceId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"send_notification">;
        parameters: z.ZodObject<{
            userId: z.ZodOptional<z.ZodString>;
            title: z.ZodString;
            content: z.ZodString;
            channel: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        }, {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }>]>;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
    executedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    action: {
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    };
    executedAt: string;
    data?: any;
    error?: string | undefined;
}, {
    success: boolean;
    action: {
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    };
    executedAt: string;
    data?: any;
    error?: string | undefined;
}>;
/**
 * Plan schema
 */
export declare const PlanSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    actions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"create_customer">;
        parameters: z.ZodObject<{
            email: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }, {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"get_customer">;
        parameters: z.ZodObject<{
            customerId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            customerId: string;
        }, {
            customerId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"update_customer">;
        parameters: z.ZodObject<{
            customerId: z.ZodString;
            email: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }, {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"list_payments">;
        parameters: z.ZodObject<{
            limit: z.ZodOptional<z.ZodNumber>;
            page: z.ZodOptional<z.ZodNumber>;
            customerId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"get_payment">;
        parameters: z.ZodObject<{
            paymentId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            paymentId: string;
        }, {
            paymentId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"list_subscriptions">;
        parameters: z.ZodObject<{
            limit: z.ZodOptional<z.ZodNumber>;
            page: z.ZodOptional<z.ZodNumber>;
            customerId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }, {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"get_subscription">;
        parameters: z.ZodObject<{
            subscriptionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            subscriptionId: string;
        }, {
            subscriptionId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"cancel_subscription">;
        parameters: z.ZodObject<{
            subscriptionId: z.ZodString;
            reason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            subscriptionId: string;
            reason?: string | undefined;
        }, {
            subscriptionId: string;
            reason?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"check_access">;
        parameters: z.ZodObject<{
            userId: z.ZodString;
            resourceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            resourceId: string;
        }, {
            userId: string;
            resourceId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"grant_access">;
        parameters: z.ZodObject<{
            userId: z.ZodString;
            resourceId: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        }, {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"revoke_access">;
        parameters: z.ZodObject<{
            userId: z.ZodString;
            resourceId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            userId: string;
            resourceId: string;
        }, {
            userId: string;
            resourceId: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    }>, z.ZodObject<{
        platform: z.ZodEnum<["whop", "gumroad"]>;
        idempotencyKey: z.ZodOptional<z.ZodString>;
    } & {
        type: z.ZodLiteral<"send_notification">;
        parameters: z.ZodObject<{
            userId: z.ZodOptional<z.ZodString>;
            title: z.ZodString;
            content: z.ZodString;
            channel: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        }, {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }, {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    }>]>, "many">;
    createdAt: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    description: string;
    actions: ({
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    })[];
    createdAt: string;
    metadata?: Record<string, any> | undefined;
}, {
    id: string;
    description: string;
    actions: ({
        platform: "whop" | "gumroad";
        type: "create_customer";
        parameters: {
            email: string;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_customer";
        parameters: {
            customerId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "update_customer";
        parameters: {
            customerId: string;
            email?: string | undefined;
            name?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_payments";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_payment";
        parameters: {
            paymentId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "list_subscriptions";
        parameters: {
            customerId?: string | undefined;
            limit?: number | undefined;
            page?: number | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "get_subscription";
        parameters: {
            subscriptionId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "cancel_subscription";
        parameters: {
            subscriptionId: string;
            reason?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "check_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "grant_access";
        parameters: {
            userId: string;
            resourceId: string;
            expiresAt?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "revoke_access";
        parameters: {
            userId: string;
            resourceId: string;
        };
        idempotencyKey?: string | undefined;
    } | {
        platform: "whop" | "gumroad";
        type: "send_notification";
        parameters: {
            title: string;
            content: string;
            userId?: string | undefined;
            channel?: string | undefined;
        };
        idempotencyKey?: string | undefined;
    })[];
    createdAt: string;
    metadata?: Record<string, any> | undefined;
}>;
/**
 * Plan result schema
 */
export declare const PlanResultSchema: z.ZodObject<{
    planId: z.ZodString;
    success: z.ZodBoolean;
    results: z.ZodArray<z.ZodObject<{
        success: z.ZodBoolean;
        action: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"create_customer">;
            parameters: z.ZodObject<{
                email: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            }, {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "create_customer";
            parameters: {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "create_customer";
            parameters: {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"get_customer">;
            parameters: z.ZodObject<{
                customerId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                customerId: string;
            }, {
                customerId: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "get_customer";
            parameters: {
                customerId: string;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "get_customer";
            parameters: {
                customerId: string;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"update_customer">;
            parameters: z.ZodObject<{
                customerId: z.ZodString;
                email: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            }, {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "update_customer";
            parameters: {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "update_customer";
            parameters: {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"list_payments">;
            parameters: z.ZodObject<{
                limit: z.ZodOptional<z.ZodNumber>;
                page: z.ZodOptional<z.ZodNumber>;
                customerId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            }, {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "list_payments";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "list_payments";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"get_payment">;
            parameters: z.ZodObject<{
                paymentId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                paymentId: string;
            }, {
                paymentId: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "get_payment";
            parameters: {
                paymentId: string;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "get_payment";
            parameters: {
                paymentId: string;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"list_subscriptions">;
            parameters: z.ZodObject<{
                limit: z.ZodOptional<z.ZodNumber>;
                page: z.ZodOptional<z.ZodNumber>;
                customerId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            }, {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "list_subscriptions";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "list_subscriptions";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"get_subscription">;
            parameters: z.ZodObject<{
                subscriptionId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                subscriptionId: string;
            }, {
                subscriptionId: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "get_subscription";
            parameters: {
                subscriptionId: string;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "get_subscription";
            parameters: {
                subscriptionId: string;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"cancel_subscription">;
            parameters: z.ZodObject<{
                subscriptionId: z.ZodString;
                reason: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                subscriptionId: string;
                reason?: string | undefined;
            }, {
                subscriptionId: string;
                reason?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "cancel_subscription";
            parameters: {
                subscriptionId: string;
                reason?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "cancel_subscription";
            parameters: {
                subscriptionId: string;
                reason?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"check_access">;
            parameters: z.ZodObject<{
                userId: z.ZodString;
                resourceId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                userId: string;
                resourceId: string;
            }, {
                userId: string;
                resourceId: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "check_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "check_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"grant_access">;
            parameters: z.ZodObject<{
                userId: z.ZodString;
                resourceId: z.ZodString;
                expiresAt: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            }, {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "grant_access";
            parameters: {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "grant_access";
            parameters: {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"revoke_access">;
            parameters: z.ZodObject<{
                userId: z.ZodString;
                resourceId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                userId: string;
                resourceId: string;
            }, {
                userId: string;
                resourceId: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "revoke_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "revoke_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        }>, z.ZodObject<{
            platform: z.ZodEnum<["whop", "gumroad"]>;
            idempotencyKey: z.ZodOptional<z.ZodString>;
        } & {
            type: z.ZodLiteral<"send_notification">;
            parameters: z.ZodObject<{
                userId: z.ZodOptional<z.ZodString>;
                title: z.ZodString;
                content: z.ZodString;
                channel: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            }, {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            platform: "whop" | "gumroad";
            type: "send_notification";
            parameters: {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        }, {
            platform: "whop" | "gumroad";
            type: "send_notification";
            parameters: {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        }>]>;
        data: z.ZodOptional<z.ZodAny>;
        error: z.ZodOptional<z.ZodString>;
        executedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
        action: {
            platform: "whop" | "gumroad";
            type: "create_customer";
            parameters: {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_customer";
            parameters: {
                customerId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "update_customer";
            parameters: {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_payments";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_payment";
            parameters: {
                paymentId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_subscriptions";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_subscription";
            parameters: {
                subscriptionId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "cancel_subscription";
            parameters: {
                subscriptionId: string;
                reason?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "check_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "grant_access";
            parameters: {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "revoke_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "send_notification";
            parameters: {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        };
        executedAt: string;
        data?: any;
        error?: string | undefined;
    }, {
        success: boolean;
        action: {
            platform: "whop" | "gumroad";
            type: "create_customer";
            parameters: {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_customer";
            parameters: {
                customerId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "update_customer";
            parameters: {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_payments";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_payment";
            parameters: {
                paymentId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_subscriptions";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_subscription";
            parameters: {
                subscriptionId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "cancel_subscription";
            parameters: {
                subscriptionId: string;
                reason?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "check_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "grant_access";
            parameters: {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "revoke_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "send_notification";
            parameters: {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        };
        executedAt: string;
        data?: any;
        error?: string | undefined;
    }>, "many">;
    executedAt: z.ZodString;
    duration: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    executedAt: string;
    planId: string;
    results: {
        success: boolean;
        action: {
            platform: "whop" | "gumroad";
            type: "create_customer";
            parameters: {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_customer";
            parameters: {
                customerId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "update_customer";
            parameters: {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_payments";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_payment";
            parameters: {
                paymentId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_subscriptions";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_subscription";
            parameters: {
                subscriptionId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "cancel_subscription";
            parameters: {
                subscriptionId: string;
                reason?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "check_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "grant_access";
            parameters: {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "revoke_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "send_notification";
            parameters: {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        };
        executedAt: string;
        data?: any;
        error?: string | undefined;
    }[];
    duration?: number | undefined;
}, {
    success: boolean;
    executedAt: string;
    planId: string;
    results: {
        success: boolean;
        action: {
            platform: "whop" | "gumroad";
            type: "create_customer";
            parameters: {
                email: string;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_customer";
            parameters: {
                customerId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "update_customer";
            parameters: {
                customerId: string;
                email?: string | undefined;
                name?: string | undefined;
                metadata?: Record<string, any> | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_payments";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_payment";
            parameters: {
                paymentId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "list_subscriptions";
            parameters: {
                customerId?: string | undefined;
                limit?: number | undefined;
                page?: number | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "get_subscription";
            parameters: {
                subscriptionId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "cancel_subscription";
            parameters: {
                subscriptionId: string;
                reason?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "check_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "grant_access";
            parameters: {
                userId: string;
                resourceId: string;
                expiresAt?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "revoke_access";
            parameters: {
                userId: string;
                resourceId: string;
            };
            idempotencyKey?: string | undefined;
        } | {
            platform: "whop" | "gumroad";
            type: "send_notification";
            parameters: {
                title: string;
                content: string;
                userId?: string | undefined;
                channel?: string | undefined;
            };
            idempotencyKey?: string | undefined;
        };
        executedAt: string;
        data?: any;
        error?: string | undefined;
    }[];
    duration?: number | undefined;
}>;
/**
 * Validation helper functions
 */
export declare function validateAction(action: unknown): {
    success: true;
    data: z.infer<typeof ActionSchema>;
} | {
    success: false;
    error: z.ZodError;
};
export declare function validatePlan(plan: unknown): {
    success: true;
    data: z.infer<typeof PlanSchema>;
} | {
    success: false;
    error: z.ZodError;
};
