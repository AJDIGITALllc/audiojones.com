#!/bin/bash

# Vercel Failed Deployment Log Downloader
# Downloads logs for all failed deployments to help debug build issues

set -e

# Configuration - set these values
VERCEL_TOKEN="${VERCEL_TOKEN:-}"
PROJECT_NAME="${PROJECT_NAME:-audiojones.com}"
TEAM_ID="${TEAM_ID:-}"
LIMIT="${LIMIT:-100}"

# Check if token is provided
if [ -z "$VERCEL_TOKEN" ]; then
    echo "Error: VERCEL_TOKEN is required"
    echo "Usage: VERCEL_TOKEN=your_token ./scripts/get-vercel-failed-logs.sh"
    echo "Or set it as an environment variable"
    exit 1
fi

echo "Downloading failed deployment logs for $PROJECT_NAME..."

# Create output directory
mkdir -p vercel-failed-logs

# Build API URL with optional team ID
DEPLOYMENTS_URL="https://api.vercel.com/v6/deployments?project=$PROJECT_NAME&limit=$LIMIT"
if [ -n "$TEAM_ID" ]; then
    DEPLOYMENTS_URL="${DEPLOYMENTS_URL}&teamId=$TEAM_ID"
fi

# 1. Get last deployments
echo "Fetching last $LIMIT deployments..."
curl -s "$DEPLOYMENTS_URL" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  > deployments.json

# Check if curl was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to fetch deployments from Vercel API"
    exit 1
fi

# 2. Filter to failed ones and dump their ids
echo "Filtering failed deployments..."
cat deployments.json | jq -r '.deployments[] | select(.state=="ERROR") | .uid' > failed.txt

# Check if we have any failed deployments
FAILED_COUNT=$(wc -l < failed.txt)
if [ "$FAILED_COUNT" -eq 0 ]; then
    echo "No failed deployments found in the last $LIMIT deployments."
    exit 0
fi

echo "Found $FAILED_COUNT failed deployments"

# Show failed deployment info
echo "Failed deployments:"
cat deployments.json | jq -r '.deployments[] | select(.state=="ERROR") | "\(.uid) | \(.createdAt) | \(.meta.githubCommitMessage // "No message")"' | head -10

# 3. Loop failed ones and download logs
echo "Downloading logs for failed deployments..."

count=0
while read -r DEPLOY_ID; do
    if [ -z "$DEPLOY_ID" ]; then
        continue
    fi
    
    count=$((count + 1))
    echo "[$count/$FAILED_COUNT] Downloading logs for $DEPLOY_ID"
    
    # Build events URL with optional team ID
    EVENTS_URL="https://api.vercel.com/v2/deployments/$DEPLOY_ID/events"
    if [ -n "$TEAM_ID" ]; then
        EVENTS_URL="${EVENTS_URL}?teamId=$TEAM_ID"
    fi
    
    # Download raw events
    curl -s "$EVENTS_URL" \
      -H "Authorization: Bearer $VERCEL_TOKEN" \
      > "vercel-failed-logs/$DEPLOY_ID.json"
    
    # Extract readable build logs
    if command -v jq > /dev/null; then
        cat "vercel-failed-logs/$DEPLOY_ID.json" | \
        jq -r '.events[] | select(.type=="stdout" or .type=="stderr") | "\(.created) [\(.type | ascii_upcase)] \(.payload.text)"' \
        > "vercel-failed-logs/$DEPLOY_ID-build.log" 2>/dev/null || true
    fi
    
    # Small delay to avoid rate limiting
    sleep 0.1
done < failed.txt

echo ""
echo "✅ Log download complete!"
echo "Files created:"
echo "  - deployments.json (full deployment data)"
echo "  - failed.txt (failed deployment IDs)"
echo "  - vercel-failed-logs/*.json (raw event data)"
echo "  - vercel-failed-logs/*-build.log (readable build logs)"