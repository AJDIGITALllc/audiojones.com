# Agent Core Architecture

## Overview

This document describes the new agent-core and connector architecture implemented for the Audio Jones platform. The architecture separates concerns into three main layers:

1. **Agent Core** - Platform-agnostic AI planning and validation
2. **Connectors** - Platform-specific API integrations
3. **Admin UI** - User-facing interface for agent operations

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Admin UI                             │
│            (/portal/admin/agents)                          │
│  Platform Selection | Plan Review | Approval | Execution   │
└──────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Endpoints                             │
│         /api/agents/plan  |  /api/agents/execute           │
└──────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Agent Core                               │
│         packages/agent-core                                 │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  DSL v1 (Universal Action Language)                 │   │
│  │  - TypeScript types + Zod schemas                   │   │
│  │  - Platform field (whitelisted)                     │   │
│  │  - Action types (whitelisted)                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Planner & Compiler                                 │   │
│  │  - planFromPrompt(input) → Plan                     │   │
│  │  - Intent → Actions compiler                        │   │
│  │  - Policy gates & validation                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Execution Engine                                   │   │
│  │  - ConnectorRegistry                                │   │
│  │  - Route actions by platform                        │   │
│  │  - Maintain idempotency & audit                     │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌────────────────────┐          ┌────────────────────┐
│  Whop Connector    │          │ Gumroad Connector  │
│  packages/         │          │ packages/          │
│  connectors/whop   │          │ connectors/gumroad │
│                    │          │                    │
│  ✅ Implemented    │          │  🚧 Stub Only     │
│  - REAL mode       │          │  - Not implemented│
│  - STUB fallback   │          │  - TODO markers   │
└────────┬───────────┘          └────────┬───────────┘
        │                                │
        ▼                                ▼
┌────────────────────┐          ┌────────────────────┐
│   Whop API         │          │  Gumroad API       │
│   api.whop.com     │          │  api.gumroad.com   │
└────────────────────┘          └────────────────────┘
```

## Package Structure

### packages/agent-core

Platform-agnostic planning and execution. **Zero platform-specific dependencies**.

```
packages/agent-core/
├── src/
│   ├── dsl/
│   │   └── v1/
│   │       ├── types.ts       # TypeScript action types
│   │       ├── schemas.ts     # Zod validation schemas
│   │       └── index.ts       # DSL v1 exports
│   ├── planner.ts            # planFromPrompt() entry point
│   ├── compiler.ts           # Intent → Plan compiler
│   ├── executor.ts           # Execution engine & registry
│   └── index.ts              # Main exports
├── package.json
└── tsconfig.json
```

**Key Exports:**
- `planFromPrompt(input)` - Generate validated plan from prompt
- `validateExistingPlan(plan)` - Validate a pre-built plan
- `ExecutionEngine` - Execute plans via connectors
- `ConnectorRegistry` - Manage platform connectors
- DSL v1 types, schemas, and validators

### packages/connectors/whop

Whop platform connector implementing `CommerceConnector` interface.

```
packages/connectors/whop/
├── src/
│   ├── interface.ts          # CommerceConnector interface
│   ├── client.ts             # Whop API client
│   ├── connector.ts          # WhopConnector implementation
│   └── index.ts              # Exports
├── package.json
└── tsconfig.json
```

**Features:**
- Full Whop API integration
- STUB mode fallback (no API key)
- Action-to-API mapping for all DSL actions
- Idempotency support

### packages/connectors/gumroad

Gumroad platform connector (skeleton implementation).

```
packages/connectors/gumroad/
├── src/
│   ├── interface.ts          # CommerceConnector interface
│   ├── connector.ts          # GumroadConnector stub
│   └── index.ts              # Exports
├── package.json
└── tsconfig.json
```

**Status:** 🚧 Stub only
- Returns "Not implemented" errors
- TODO markers for OAuth, token storage
- TODO markers for API endpoint mapping

## Universal DSL v1

The DSL defines a platform-agnostic action language with strict typing and validation.

### Core Principles

1. **Platform Field Required** - Every action must specify its target platform
2. **Action Type Whitelisting** - Only approved action types are allowed
3. **Strong Typing** - TypeScript types + Zod runtime validation
4. **Versioned** - Exported as `dsl.v1` for future compatibility

### Action Structure

```typescript
interface Action {
  platform: 'whop' | 'gumroad';  // Required, whitelisted
  type: string;                   // Required, whitelisted
  parameters: Record<string, any>; // Action-specific params
  idempotencyKey?: string;        // Optional idempotency
}
```

### Supported Action Types

- `create_customer` - Create a new customer
- `get_customer` - Retrieve customer details
- `update_customer` - Update customer information
- `list_payments` - List payment transactions
- `get_payment` - Retrieve payment details
- `list_subscriptions` - List subscriptions
- `get_subscription` - Retrieve subscription details
- `cancel_subscription` - Cancel a subscription
- `check_access` - Verify user access
- `grant_access` - Grant access to a resource
- `revoke_access` - Revoke access
- `send_notification` - Send notification to user

### Plan Structure

```typescript
interface Plan {
  id: string;                      // Unique plan ID
  description: string;             // Natural language description
  actions: Action[];               // Ordered list of actions
  createdAt: string;               // ISO timestamp
  metadata?: Record<string, any>;  // Optional metadata
}
```

## CommerceConnector Interface

All platform connectors implement this interface:

```typescript
interface CommerceConnector {
  readonly platform: string;
  
  initialize(config: ConnectorConfig): Promise<void>;
  healthCheck(): Promise<HealthCheckResult>;
  executeAction(action: Action): Promise<ActionResult>;
  executeActions(actions: Action[]): Promise<ActionResult[]>;
  supportsAction(actionType: string): boolean;
  
  getMetadata(): {
    name: string;
    version: string;
    capabilities: string[];
    configured: boolean;
  };
}
```

### Configuration

```typescript
interface ConnectorConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  timeout?: number;
  metadata?: Record<string, any>;
}
```

## Execution Flow

### 1. Plan Generation (PLAN)

```typescript
const result = await planFromPrompt({
  prompt: 'List the last 10 payments',
  context: { platform: 'whop' },
  constraints: { maxActions: 10 }
});
```

**Steps:**
1. Compile intent to raw plan
2. Validate plan structure (Zod)
3. Validate each action (Zod)
4. Apply policy gates
5. Return validated plan

### 2. Plan Review (APPROVE)

UI displays:
- Plan details (ID, description, timestamp)
- Actions grouped by platform
- Platform labels per action
- Parameter preview

User can:
- Approve plan → proceed to execution
- Cancel → return to input

### 3. Plan Execution (EXECUTE)

```typescript
const registry = new ConnectorRegistry();
registry.register('whop', whopConnector);
registry.register('gumroad', gumroadConnector);

const engine = new ExecutionEngine(registry);
const result = await engine.executePlan(plan);
```

**Steps:**
1. Group actions by platform
2. Route to appropriate connector
3. Execute actions sequentially (per platform)
4. Collect results with timestamps
5. Return aggregated result

### 4. Results Display

UI shows:
- Overall success/failure
- Execution duration
- Results grouped by platform
- Success/error indicators per action
- Response data preview

## Admin UI

Location: `/portal/admin/agents`

### Features

**Platform Status Dashboard**
- Shows all registered platforms
- Displays enabled/disabled state
- Shows configuration status (✅/❌)
- Indicates REAL vs STUB mode

**Workflow Progress**
- Visual progress indicator: INPUT → PLAN → APPROVE → EXECUTE
- Current stage highlighted
- Prevents invalid state transitions

**Platform Selection**
- Dropdown with enabled platforms
- Disabled platforms shown but not selectable
- Currently: Whop (enabled), Gumroad (disabled)

**Plan Viewer**
- Actions grouped by platform
- Platform badges on each action
- Collapsible parameter view
- JSON-formatted display

**Execution Results**
- Success/failure indicators
- Execution timing
- Results grouped by platform
- Error messages displayed
- Response data preview (max height, scrollable)

## API Endpoints

### POST /api/agents/plan

Generate a validated plan from a natural language prompt.

**Request:**
```json
{
  "prompt": "List the last 10 payments",
  "context": {
    "platform": "whop",
    "userId": "user_123"
  },
  "constraints": {
    "maxActions": 10,
    "allowedPlatforms": ["whop"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "plan": {
    "id": "plan_abc123",
    "description": "List the last 10 payments",
    "actions": [
      {
        "platform": "whop",
        "type": "list_payments",
        "parameters": { "limit": 10 }
      }
    ],
    "createdAt": "2024-12-13T00:00:00.000Z"
  }
}
```

### POST /api/agents/execute

Execute a validated plan via connectors.

**Request:**
```json
{
  "plan": {
    "id": "plan_abc123",
    "description": "List the last 10 payments",
    "actions": [...]
  }
}
```

**Response:**
```json
{
  "planId": "plan_abc123",
  "success": true,
  "results": [
    {
      "success": true,
      "action": {...},
      "data": {...},
      "executedAt": "2024-12-13T00:00:00.000Z"
    }
  ],
  "executedAt": "2024-12-13T00:00:00.000Z",
  "duration": 123
}
```

## Stub Mode & Fallbacks

### Whop Connector

**REAL Mode** (API key provided):
- Makes actual API calls to Whop
- Returns real data
- Subject to rate limits

**STUB Mode** (no API key):
- Returns fake success responses
- Includes `stub: true` in data
- Useful for testing/development

### Gumroad Connector

**Status:** Stub only (not implemented)
- All actions return "Not implemented" error
- Maintains type safety
- Ready for future implementation

## Testing

Run the test suite:

```bash
npx tsx test-agent-system.ts
```

Tests verify:
1. Plan generation from prompts
2. Connector registration
3. Health checks
4. Metadata retrieval
5. Plan execution in stub mode

## Future Enhancements

### Near-term
- [ ] Add OpenAI integration for better prompt parsing
- [ ] Implement Gumroad OAuth flow
- [ ] Add more action types (refunds, disputes, etc.)
- [ ] Add transaction support for multi-action plans
- [ ] Implement audit logging

### Long-term
- [ ] Add more platforms (Stripe, Shopify, etc.)
- [ ] Support for parallel action execution
- [ ] Plan templates and saved workflows
- [ ] Real-time execution progress updates
- [ ] Rollback/undo capabilities
- [ ] Scheduled plan execution

## Migration Notes

### From Old Agent System

The old agent actions (`/api/agents/route.ts`, `src/lib/agents/whop-actions.ts`) are still present but **deprecated**. They should be migrated to use the new system:

**Old:**
```typescript
// Direct action execution
executeAgentAction('customer_onboarding', params);
```

**New:**
```typescript
// Plan-based execution
const plan = await planFromPrompt({
  prompt: 'Onboard customer user@example.com'
});
await engine.executePlan(plan);
```

### Backwards Compatibility

The old `/api/agents` endpoint remains functional for existing integrations. However, new integrations should use `/api/agents/plan` and `/api/agents/execute`.

## Security Considerations

1. **API Key Security** - Connectors only access keys via environment, never exposed to client
2. **Plan Validation** - All plans strictly validated before execution
3. **Action Whitelisting** - Only approved action types allowed
4. **Platform Isolation** - Each connector isolated, can't access other platforms
5. **Audit Trail** - All executions include timestamps and can be logged

## Performance

- Plan generation: < 10ms (rule-based, will increase with LLM)
- Plan validation: < 5ms
- Execution time: Varies by connector (typically 100-500ms per action)
- Stub mode: < 1ms per action

## License

Internal use only - Audio Jones / AJDIGITAL LLC
