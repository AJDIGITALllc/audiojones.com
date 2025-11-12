import { env } from "@aj/config";

/**
 * MCP (Model Context Protocol) configuration for Whop integration
 * This enables AI agents to interact with Whop APIs through structured tools
 */

export interface MCPToolCall {
  name: string;
  arguments: Record<string, any>;
}

export interface MCPResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * MCP Server configuration for development environments
 * Add this to your Cursor/Claude config at ~/.cursor/config/mcp.json
 */
export const MCP_CONFIG = {
  mcpServers: {
    "whop-docs": {
      url: "https://docs.whop.com/mcp",
      description: "Whop documentation and API reference"
    },
    "whop-api": {
      url: "https://mcp.whop.com/sse",
      description: "Whop API operations and data access"
    },
    "audiojones-local": {
      url: `${env.NEXT_PUBLIC_SITE_URL}/api/mcp`,
      description: "Audio Jones local MCP server for development"
    }
  }
};

/**
 * Available MCP tools for Whop integration
 */
export const WHOP_MCP_TOOLS = [
  {
    name: "list_payments",
    description: "List payments for the company",
    parameters: {
      type: "object",
      properties: {
        page: { type: "number", description: "Page number for pagination" },
        limit: { type: "number", description: "Number of items per page" },
        company_id: { type: "string", description: "Company ID to filter by" }
      }
    }
  },
  {
    name: "get_user_access",
    description: "Check if user has access to an experience",
    parameters: {
      type: "object",
      properties: {
        user_id: { type: "string", description: "User ID to check" },
        experience_id: { type: "string", description: "Experience ID to check access for" }
      },
      required: ["user_id", "experience_id"]
    }
  },
  {
    name: "send_notification",
    description: "Send notification to users",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Notification title" },
        content: { type: "string", description: "Notification content" },
        experience_id: { type: "string", description: "Experience ID to send to" },
        company_id: { type: "string", description: "Company ID to send to" },
        rest_path: { type: "string", description: "Deep link path" }
      },
      required: ["title", "content"]
    }
  },
  {
    name: "create_forum_post",
    description: "Create a new forum post",
    parameters: {
      type: "object",
      properties: {
        experience_id: { type: "string", description: "Experience ID for the forum" },
        content: { type: "string", description: "Post content (Markdown supported)" },
        pinned: { type: "boolean", description: "Whether to pin the post" }
      },
      required: ["experience_id", "content"]
    }
  }
] as const;

/**
 * Execute MCP tool call
 */
export async function executeMCPTool(toolCall: MCPToolCall): Promise<MCPResponse> {
  try {
    switch (toolCall.name) {
      case "list_payments":
        const response = await fetch(`${env.NEXT_PUBLIC_SITE_URL}/api/payments?${new URLSearchParams(toolCall.arguments)}`);
        const data = await response.json();
        return { success: response.ok, data: response.ok ? data : undefined, error: response.ok ? undefined : data.error };
        
      case "get_user_access":
        const accessResponse = await fetch(`${env.NEXT_PUBLIC_SITE_URL}/api/access?${new URLSearchParams(toolCall.arguments)}`);
        const accessData = await accessResponse.json();
        return { success: accessResponse.ok, data: accessResponse.ok ? accessData : undefined, error: accessResponse.ok ? undefined : accessData.error };
        
      case "send_notification":
        const notificationResponse = await fetch(`${env.NEXT_PUBLIC_SITE_URL}/api/notifications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toolCall.arguments)
        });
        const notificationData = await notificationResponse.json();
        return { success: notificationResponse.ok, data: notificationResponse.ok ? notificationData : undefined, error: notificationResponse.ok ? undefined : notificationData.error };
        
      default:
        return { success: false, error: `Unknown tool: ${toolCall.name}` };
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Generate MCP connector configuration for Claude
 */
export function generateClaudeConnectorConfig() {
  return {
    name: "Audio Jones Whop Integration",
    url: `${env.NEXT_PUBLIC_SITE_URL}/api/mcp`,
    authentication: {
      type: "bearer_token",
      token: env.WHOP_API_KEY
    },
    tools: WHOP_MCP_TOOLS
  };
}