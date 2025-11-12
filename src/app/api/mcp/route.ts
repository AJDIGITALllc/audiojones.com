import { NextRequest, NextResponse } from "next/server";
import { executeMCPTool, WHOP_MCP_TOOLS, type MCPToolCall } from "@/lib/mcp/whop";

/**
 * MCP (Model Context Protocol) server endpoint
 * Enables AI agents to interact with Audio Jones systems
 */

export async function GET(req: NextRequest) {
  // Return available tools and server info
  return NextResponse.json({
    server: {
      name: "Audio Jones MCP Server",
      version: "1.0.0",
      description: "MCP server for Audio Jones Whop integration and automation"
    },
    tools: WHOP_MCP_TOOLS,
    capabilities: {
      resources: true,
      tools: true,
      prompts: false
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const toolCall: MCPToolCall = await req.json();
    
    // Validate tool call structure
    if (!toolCall.name || typeof toolCall.name !== "string") {
      return NextResponse.json(
        { success: false, error: "Tool name is required" },
        { status: 400 }
      );
    }
    
    if (!toolCall.arguments || typeof toolCall.arguments !== "object") {
      return NextResponse.json(
        { success: false, error: "Tool arguments are required" },
        { status: 400 }
      );
    }
    
    // Execute the tool
    const result = await executeMCPTool(toolCall);
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    });
    
  } catch (error) {
    console.error("MCP server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
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