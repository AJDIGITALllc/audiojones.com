import { NextRequest, NextResponse } from "next/server";
import { executeAgentAction, AGENT_ACTIONS } from "@/lib/agents/whop-actions";

/**
 * AgentKit execution endpoint
 * Enables OpenAI agents to execute predefined actions
 */

export async function GET(req: NextRequest) {
  // Return available agent actions
  return NextResponse.json({
    server: {
      name: "Audio Jones AgentKit Server",
      version: "1.0.0",
      description: "AgentKit server for Audio Jones automation and customer management"
    },
    actions: AGENT_ACTIONS.map(action => ({
      name: action.name,
      description: action.description,
      parameters: action.parameters
    })),
    capabilities: {
      customer_onboarding: true,
      monthly_reporting: true,
      customer_support: true,
      whop_integration: true,
      n8n_workflows: true
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const { action, parameters } = await req.json();
    
    // Validate request structure
    if (!action || typeof action !== "string") {
      return NextResponse.json(
        { success: false, error: "Action name is required" },
        { status: 400 }
      );
    }
    
    if (!parameters || typeof parameters !== "object") {
      return NextResponse.json(
        { success: false, error: "Action parameters are required" },
        { status: 400 }
      );
    }
    
    // Execute the agent action
    const result = await executeAgentAction(action, parameters);
    
    return NextResponse.json({
      success: true,
      action,
      parameters,
      result,
      executed_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("AgentKit execution error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: error instanceof Error && error.message.includes("Unknown agent action") ? 404 : 500 }
    );
  }
}

// OPTIONS for CORS support
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}