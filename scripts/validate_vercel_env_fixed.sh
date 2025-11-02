#!/bin/bash
# 🧩 Audio Jones — Vercel Environment Validation Script
# Purpose: Verify all required Vercel environment variables are properly set and authenticated.
# Compatible: Jules, Codex, VS Code Terminal, PowerShell, Git Bash

# Pre-flight check for jq
if ! command -v jq &> /dev/null
then
    echo "⚠️ 'jq' is not installed. Please install it to run this script."
    exit 1
fi

# Step 1: Print currently loaded Vercel environment variables
echo "🔍 Checking for required environment variables..."
echo "----------------------------------------------"
echo "VERCEL_TEAM_ID: $VERCEL_TEAM_ID"
echo "VERCEL_TOKEN: $VERCEL_TOKEN"
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "----------------------------------------------"

# Step 2: Validate token and team ID with the Vercel API
echo "🧪 Validating Vercel API token and team ID..."
projects_response=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
"https://api.vercel.com/v9/projects?teamId=$VERCEL_TEAM_ID")

if [ -z "$projects_response" ]; then
    echo "⚠️ Unable to fetch projects. Check your token and team ID."
else
    echo "$projects_response" | jq '.projects[] | {name: .name, id: .id, latestDeployments: .latestDeployments[0].state}'
fi

# Step 3: Verify the Audio Jones project connection
echo "----------------------------------------------"
echo "🎯 Checking for 'audiojones-com' project..."
project_response=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
"https://api.vercel.com/v9/projects/audiojones-com?teamId=$VERCEL_TEAM_ID")

if [ -z "$project_response" ]; then
    echo "⚠️ Project not found or not linked to this team."
else
    echo "$project_response" | jq '{name: .name, id: .id, environment: .targets.production, framework: .framework}'
fi

# Step 4: Optional — list environment variables for current project
echo "----------------------------------------------"
echo "📦 Listing environment variables for audiojones-com..."
env_response=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
"https://api.vercel.com/v9/projects/audiojones-com/env?teamId=$VERCEL_TEAM_ID")

if [ -z "$env_response" ]; then
    echo "⚠️ Could not list project env variables."
else
    echo "$env_response" | jq '.envs[] | {key: .key, value: .value, target: .target}'
fi

echo "✅ Validation complete. Review above results for missing or invalid credentials."
