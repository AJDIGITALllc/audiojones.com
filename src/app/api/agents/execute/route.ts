/**
 * Agent Plan Execution API
 * Executes validated plans by routing actions to platform connectors
 */

import { NextRequest, NextResponse } from 'next/server';
import { ExecutionEngine, ConnectorRegistry, validateExistingPlan } from '@aj/agent-core';
import { WhopConnector } from '@aj/connector-whop';
import { GumroadConnector } from '@aj/connector-gumroad';
import { env } from '@aj/config';

// Initialize connectors
async function initializeConnectors(): Promise<ConnectorRegistry> {
  const registry = new ConnectorRegistry();

  // Register Whop connector
  const whopConnector = new WhopConnector();
  await whopConnector.initialize({
    apiKey: env.WHOP_API_KEY,
    metadata: {
      companyId: env.NEXT_PUBLIC_WHOP_COMPANY_ID,
    },
  });
  registry.register('whop', whopConnector);

  // Register Gumroad connector (stub)
  const gumroadConnector = new GumroadConnector();
  await gumroadConnector.initialize({});
  registry.register('gumroad', gumroadConnector);

  return registry;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan } = body;

    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Plan is required' },
        { status: 400 }
      );
    }

    // Validate plan
    const validation = validateExistingPlan(plan);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
          validationErrors: validation.validationErrors,
        },
        { status: 400 }
      );
    }

    // Initialize execution engine with connectors
    const registry = await initializeConnectors();
    const engine = new ExecutionEngine(registry);

    // Execute plan
    const result = await engine.executePlan(validation.plan!);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Agent Execute API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
