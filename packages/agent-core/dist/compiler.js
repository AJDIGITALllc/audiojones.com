/**
 * Intent-to-Plan Compiler
 * Converts natural language prompts into structured action plans
 */
/**
 * Compile a natural language intent into a structured plan
 * This is a simplified implementation - in production, this would call OpenAI or similar
 */
export async function compilePlanFromIntent(input) {
    const planId = generatePlanId();
    const createdAt = new Date().toISOString();
    // Parse the prompt to determine actions
    const actions = parsePromptToActions(input.prompt, input.context?.platform);
    return {
        id: planId,
        description: input.prompt,
        actions,
        createdAt,
        metadata: {
            source: 'compiler',
            promptLength: input.prompt.length,
            context: input.context,
        },
    };
}
/**
 * Parse prompt into actions
 * This is a simple rule-based parser - production would use LLM
 */
function parsePromptToActions(prompt, defaultPlatform = 'whop') {
    const actions = [];
    const lowerPrompt = prompt.toLowerCase();
    // Detect customer-related actions
    if (lowerPrompt.includes('create customer') || lowerPrompt.includes('new customer')) {
        const emailMatch = prompt.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch) {
            actions.push({
                platform: defaultPlatform,
                type: 'create_customer',
                parameters: {
                    email: emailMatch[1],
                },
            });
        }
    }
    if (lowerPrompt.includes('get customer') || lowerPrompt.includes('find customer')) {
        const idMatch = prompt.match(/customer[:\s]+([a-zA-Z0-9_-]+)/i);
        if (idMatch) {
            actions.push({
                platform: defaultPlatform,
                type: 'get_customer',
                parameters: {
                    customerId: idMatch[1],
                },
            });
        }
    }
    // Detect payment-related actions
    if (lowerPrompt.includes('list payments') || lowerPrompt.includes('get payments')) {
        actions.push({
            platform: defaultPlatform,
            type: 'list_payments',
            parameters: {
                limit: 10,
            },
        });
    }
    if (lowerPrompt.includes('get payment')) {
        const idMatch = prompt.match(/payment[:\s]+([a-zA-Z0-9_-]+)/i);
        if (idMatch) {
            actions.push({
                platform: defaultPlatform,
                type: 'get_payment',
                parameters: {
                    paymentId: idMatch[1],
                },
            });
        }
    }
    // Detect subscription-related actions
    if (lowerPrompt.includes('list subscriptions') || lowerPrompt.includes('get subscriptions')) {
        actions.push({
            platform: defaultPlatform,
            type: 'list_subscriptions',
            parameters: {
                limit: 10,
            },
        });
    }
    if (lowerPrompt.includes('cancel subscription')) {
        const idMatch = prompt.match(/subscription[:\s]+([a-zA-Z0-9_-]+)/i);
        if (idMatch) {
            actions.push({
                platform: defaultPlatform,
                type: 'cancel_subscription',
                parameters: {
                    subscriptionId: idMatch[1],
                    reason: 'Customer request',
                },
            });
        }
    }
    // Detect notification actions
    if (lowerPrompt.includes('send notification') || lowerPrompt.includes('notify')) {
        const titleMatch = prompt.match(/title[:\s]+"([^"]+)"/i);
        const contentMatch = prompt.match(/content[:\s]+"([^"]+)"/i);
        if (titleMatch && contentMatch) {
            actions.push({
                platform: defaultPlatform,
                type: 'send_notification',
                parameters: {
                    title: titleMatch[1],
                    content: contentMatch[1],
                },
            });
        }
    }
    // Detect access-related actions
    if (lowerPrompt.includes('check access')) {
        const userMatch = prompt.match(/user[:\s]+([a-zA-Z0-9_-]+)/i);
        const resourceMatch = prompt.match(/resource[:\s]+([a-zA-Z0-9_-]+)/i);
        if (userMatch && resourceMatch) {
            actions.push({
                platform: defaultPlatform,
                type: 'check_access',
                parameters: {
                    userId: userMatch[1],
                    resourceId: resourceMatch[1],
                },
            });
        }
    }
    // If no actions were parsed, create a default info-gathering action
    if (actions.length === 0) {
        actions.push({
            platform: defaultPlatform,
            type: 'list_payments',
            parameters: {
                limit: 5,
            },
        });
    }
    return actions;
}
/**
 * Generate a unique plan ID
 */
function generatePlanId() {
    return `plan_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
