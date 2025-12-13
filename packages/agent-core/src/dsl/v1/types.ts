/**
 * Universal Action DSL v1
 * Platform-agnostic action definitions for commerce automation
 */

/**
 * Supported commerce platforms
 */
export type Platform = 'whop' | 'gumroad';

/**
 * Base action interface - all actions must extend this
 */
export interface BaseAction {
  /**
   * Platform this action targets (required)
   */
  platform: Platform;
  
  /**
   * Action type - must be whitelisted
   */
  type: string;
  
  /**
   * Action parameters
   */
  parameters: Record<string, any>;
  
  /**
   * Optional idempotency key
   */
  idempotencyKey?: string;
}

/**
 * Customer management actions
 */
export interface CreateCustomerAction extends BaseAction {
  type: 'create_customer';
  parameters: {
    email: string;
    name?: string;
    metadata?: Record<string, any>;
  };
}

export interface GetCustomerAction extends BaseAction {
  type: 'get_customer';
  parameters: {
    customerId: string;
  };
}

export interface UpdateCustomerAction extends BaseAction {
  type: 'update_customer';
  parameters: {
    customerId: string;
    email?: string;
    name?: string;
    metadata?: Record<string, any>;
  };
}

/**
 * Payment management actions
 */
export interface ListPaymentsAction extends BaseAction {
  type: 'list_payments';
  parameters: {
    limit?: number;
    page?: number;
    customerId?: string;
  };
}

export interface GetPaymentAction extends BaseAction {
  type: 'get_payment';
  parameters: {
    paymentId: string;
  };
}

/**
 * Subscription management actions
 */
export interface ListSubscriptionsAction extends BaseAction {
  type: 'list_subscriptions';
  parameters: {
    limit?: number;
    page?: number;
    customerId?: string;
  };
}

export interface GetSubscriptionAction extends BaseAction {
  type: 'get_subscription';
  parameters: {
    subscriptionId: string;
  };
}

export interface CancelSubscriptionAction extends BaseAction {
  type: 'cancel_subscription';
  parameters: {
    subscriptionId: string;
    reason?: string;
  };
}

/**
 * Access management actions
 */
export interface CheckAccessAction extends BaseAction {
  type: 'check_access';
  parameters: {
    userId: string;
    resourceId: string;
  };
}

export interface GrantAccessAction extends BaseAction {
  type: 'grant_access';
  parameters: {
    userId: string;
    resourceId: string;
    expiresAt?: string;
  };
}

export interface RevokeAccessAction extends BaseAction {
  type: 'revoke_access';
  parameters: {
    userId: string;
    resourceId: string;
  };
}

/**
 * Notification actions
 */
export interface SendNotificationAction extends BaseAction {
  type: 'send_notification';
  parameters: {
    userId?: string;
    title: string;
    content: string;
    channel?: string;
  };
}

/**
 * Union type of all supported actions
 */
export type Action =
  | CreateCustomerAction
  | GetCustomerAction
  | UpdateCustomerAction
  | ListPaymentsAction
  | GetPaymentAction
  | ListSubscriptionsAction
  | GetSubscriptionAction
  | CancelSubscriptionAction
  | CheckAccessAction
  | GrantAccessAction
  | RevokeAccessAction
  | SendNotificationAction;

/**
 * Action execution result
 */
export interface ActionResult {
  success: boolean;
  action: Action;
  data?: any;
  error?: string;
  executedAt: string;
}

/**
 * Plan containing multiple actions
 */
export interface Plan {
  id: string;
  description: string;
  actions: Action[];
  createdAt: string;
  metadata?: Record<string, any>;
}

/**
 * Plan execution result
 */
export interface PlanResult {
  planId: string;
  success: boolean;
  results: ActionResult[];
  executedAt: string;
  duration?: number;
}

/**
 * Whitelisted action types
 */
export const WHITELISTED_ACTION_TYPES = [
  'create_customer',
  'get_customer',
  'update_customer',
  'list_payments',
  'get_payment',
  'list_subscriptions',
  'get_subscription',
  'cancel_subscription',
  'check_access',
  'grant_access',
  'revoke_access',
  'send_notification',
] as const;

export type WhitelistedActionType = typeof WHITELISTED_ACTION_TYPES[number];
