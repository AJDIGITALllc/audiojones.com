/**
 * Zod schemas for Universal Action DSL v1
 * Provides runtime validation for all action types
 */
import { z } from 'zod';
import { WHITELISTED_ACTION_TYPES } from './types.js';
/**
 * Platform schema
 */
export const PlatformSchema = z.enum(['whop', 'gumroad']);
/**
 * Action type schema - must be whitelisted
 */
export const ActionTypeSchema = z.enum(WHITELISTED_ACTION_TYPES);
/**
 * Base action schema
 */
export const BaseActionSchema = z.object({
    platform: PlatformSchema,
    type: ActionTypeSchema,
    parameters: z.record(z.any()),
    idempotencyKey: z.string().optional(),
});
/**
 * Customer management action schemas
 */
export const CreateCustomerActionSchema = BaseActionSchema.extend({
    type: z.literal('create_customer'),
    parameters: z.object({
        email: z.string().email(),
        name: z.string().optional(),
        metadata: z.record(z.any()).optional(),
    }),
});
export const GetCustomerActionSchema = BaseActionSchema.extend({
    type: z.literal('get_customer'),
    parameters: z.object({
        customerId: z.string(),
    }),
});
export const UpdateCustomerActionSchema = BaseActionSchema.extend({
    type: z.literal('update_customer'),
    parameters: z.object({
        customerId: z.string(),
        email: z.string().email().optional(),
        name: z.string().optional(),
        metadata: z.record(z.any()).optional(),
    }),
});
/**
 * Payment management action schemas
 */
export const ListPaymentsActionSchema = BaseActionSchema.extend({
    type: z.literal('list_payments'),
    parameters: z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
        customerId: z.string().optional(),
    }),
});
export const GetPaymentActionSchema = BaseActionSchema.extend({
    type: z.literal('get_payment'),
    parameters: z.object({
        paymentId: z.string(),
    }),
});
/**
 * Subscription management action schemas
 */
export const ListSubscriptionsActionSchema = BaseActionSchema.extend({
    type: z.literal('list_subscriptions'),
    parameters: z.object({
        limit: z.number().optional(),
        page: z.number().optional(),
        customerId: z.string().optional(),
    }),
});
export const GetSubscriptionActionSchema = BaseActionSchema.extend({
    type: z.literal('get_subscription'),
    parameters: z.object({
        subscriptionId: z.string(),
    }),
});
export const CancelSubscriptionActionSchema = BaseActionSchema.extend({
    type: z.literal('cancel_subscription'),
    parameters: z.object({
        subscriptionId: z.string(),
        reason: z.string().optional(),
    }),
});
/**
 * Access management action schemas
 */
export const CheckAccessActionSchema = BaseActionSchema.extend({
    type: z.literal('check_access'),
    parameters: z.object({
        userId: z.string(),
        resourceId: z.string(),
    }),
});
export const GrantAccessActionSchema = BaseActionSchema.extend({
    type: z.literal('grant_access'),
    parameters: z.object({
        userId: z.string(),
        resourceId: z.string(),
        expiresAt: z.string().optional(),
    }),
});
export const RevokeAccessActionSchema = BaseActionSchema.extend({
    type: z.literal('revoke_access'),
    parameters: z.object({
        userId: z.string(),
        resourceId: z.string(),
    }),
});
/**
 * Notification action schema
 */
export const SendNotificationActionSchema = BaseActionSchema.extend({
    type: z.literal('send_notification'),
    parameters: z.object({
        userId: z.string().optional(),
        title: z.string(),
        content: z.string(),
        channel: z.string().optional(),
    }),
});
/**
 * Union schema for all actions
 */
export const ActionSchema = z.discriminatedUnion('type', [
    CreateCustomerActionSchema,
    GetCustomerActionSchema,
    UpdateCustomerActionSchema,
    ListPaymentsActionSchema,
    GetPaymentActionSchema,
    ListSubscriptionsActionSchema,
    GetSubscriptionActionSchema,
    CancelSubscriptionActionSchema,
    CheckAccessActionSchema,
    GrantAccessActionSchema,
    RevokeAccessActionSchema,
    SendNotificationActionSchema,
]);
/**
 * Action result schema
 */
export const ActionResultSchema = z.object({
    success: z.boolean(),
    action: ActionSchema,
    data: z.any().optional(),
    error: z.string().optional(),
    executedAt: z.string(),
});
/**
 * Plan schema
 */
export const PlanSchema = z.object({
    id: z.string(),
    description: z.string(),
    actions: z.array(ActionSchema),
    createdAt: z.string(),
    metadata: z.record(z.any()).optional(),
});
/**
 * Plan result schema
 */
export const PlanResultSchema = z.object({
    planId: z.string(),
    success: z.boolean(),
    results: z.array(ActionResultSchema),
    executedAt: z.string(),
    duration: z.number().optional(),
});
/**
 * Validation helper functions
 */
export function validateAction(action) {
    const result = ActionSchema.safeParse(action);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}
export function validatePlan(plan) {
    const result = PlanSchema.safeParse(plan);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}
