/**
 * AI Planner for generating validated action plans
 * Platform-agnostic - no direct platform API imports
 */
import { validatePlan, validateAction } from './dsl/v1/schemas.js';
import { compilePlanFromIntent } from './compiler.js';
/**
 * Generate a validated plan from user input
 * This is the main entry point for the agent-core
 */
export async function planFromPrompt(input) {
    try {
        // Step 1: Compile intent to raw plan
        const rawPlan = await compilePlanFromIntent(input);
        // Step 2: Validate the plan structure
        const validation = validatePlan(rawPlan);
        if (!validation.success) {
            return {
                success: false,
                error: 'Plan validation failed',
                validationErrors: validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
            };
        }
        // Step 3: Validate each action
        const actionValidationErrors = [];
        for (let i = 0; i < validation.data.actions.length; i++) {
            const actionValidation = validateAction(validation.data.actions[i]);
            if (!actionValidation.success) {
                actionValidationErrors.push(`Action ${i}: ${actionValidation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
            }
        }
        if (actionValidationErrors.length > 0) {
            return {
                success: false,
                error: 'Action validation failed',
                validationErrors: actionValidationErrors,
            };
        }
        // Step 4: Apply policy gates
        const gatedPlan = applyPolicyGates(validation.data, input.constraints);
        return {
            success: true,
            plan: gatedPlan,
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error during plan generation',
        };
    }
}
/**
 * Apply policy gates to filter/modify the plan
 */
function applyPolicyGates(plan, constraints) {
    let filteredActions = [...plan.actions];
    // Apply max actions constraint
    if (constraints?.maxActions && filteredActions.length > constraints.maxActions) {
        filteredActions = filteredActions.slice(0, constraints.maxActions);
    }
    // Apply platform filtering
    if (constraints?.allowedPlatforms && constraints.allowedPlatforms.length > 0) {
        filteredActions = filteredActions.filter(action => constraints.allowedPlatforms.includes(action.platform));
    }
    return {
        ...plan,
        actions: filteredActions,
        metadata: {
            ...plan.metadata,
            gatesApplied: true,
            constraints: constraints || {},
        },
    };
}
/**
 * Validate a pre-built plan
 */
export function validateExistingPlan(plan) {
    const validation = validatePlan(plan);
    if (!validation.success) {
        return {
            success: false,
            error: 'Plan validation failed',
            validationErrors: validation.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
        };
    }
    return {
        success: true,
        plan: validation.data,
    };
}
