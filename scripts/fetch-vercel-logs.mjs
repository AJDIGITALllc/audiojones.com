#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const APP_NAME = 'audiojones';
const DEPLOYMENTS_LIMIT = 20;
const API_BASE = 'https://api.vercel.com';
const ERROR_PATTERNS = [
  { regex: /(Missing|Invalid) (environment|env) (variable|variables)/i, message: 'Missing environment variable' },
  { regex: /build cache/i, message: 'Build cache issue' },
  { regex: /framework (was )?not detected/i, message: 'Framework not detected' },
  { regex: /prisma (generate|migration)/i, message: 'Prisma generate/migration issue' },
  { regex: /next (build|export) failed/i, message: 'Next.js build failed' },
];

function getCliFlagValue(flag) {
  const index = process.argv.findIndex((arg) => arg === flag);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  const flagWithEqualsPrefix = `${flag}=`;
  const equalsMatch = process.argv.find((arg) => arg.startsWith(flagWithEqualsPrefix));
  if (equalsMatch) {
    return equalsMatch.slice(flagWithEqualsPrefix.length);
  }
  return undefined;
}

const token = getCliFlagValue('--token') ?? process.env.VERCEL_TOKEN;

if (!token) {
  console.error('Missing Vercel access token.');
  console.error('Pass it via the --token flag or the VERCEL_TOKEN environment variable. Examples (PowerShell):');
  console.error('  node scripts/fetch-vercel-logs.mjs --token <PUT_YOUR_VERCEL_TOKEN_HERE>');
  console.error('  $env:VERCEL_TOKEN = "<PUT_YOUR_VERCEL_TOKEN_HERE>"; node scripts/fetch-vercel-logs.mjs');
  process.exit(1);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Request failed for ${url} with ${response.status}: ${body}`);
  }

  return response.json();
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

function formatEventMessage(event) {
  const pieces = [];
  if (event.type) {
    pieces.push(`[${event.type}]`);
  }

  const payload = event.payload ?? {};
  const candidateFields = [
    payload.text,
    payload.message,
    payload.body,
    payload.description,
    payload.output,
    payload.error,
  ];

  for (const field of candidateFields) {
    if (typeof field === 'string' && field.trim().length > 0) {
      pieces.push(field.trim());
      break;
    }
  }

  if (pieces.length === 1 && typeof payload === 'string') {
    pieces.push(payload.trim());
  }

  if (pieces.length === 1 && event.message) {
    pieces.push(String(event.message).trim());
  }

  if (pieces.length === 0) {
    pieces.push('[no message payload]');
  }

  return pieces.join(' ');
}

function detectLikelyCauses(messages) {
  const causes = new Set();
  for (const message of messages) {
    for (const pattern of ERROR_PATTERNS) {
      if (pattern.regex.test(message)) {
        causes.add(pattern.message);
      }
    }
  }
  return Array.from(causes);
}

async function main() {
  const deploymentsUrl = `${API_BASE}/v6/deployments?app=${APP_NAME}&limit=${DEPLOYMENTS_LIMIT}`;
  const deploymentsData = await fetchJson(deploymentsUrl);
  const deployments = Array.isArray(deploymentsData.deployments)
    ? deploymentsData.deployments
    : [];

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logsDir = path.join(process.cwd(), 'vercel_logs');
  await fs.mkdir(logsDir, { recursive: true });
  const jsonPath = path.join(logsDir, `deployments_${timestamp}.json`);
  await fs.writeFile(jsonPath, JSON.stringify(deploymentsData, null, 2), 'utf8');

  if (deployments.length === 0) {
    console.log('No deployments found.');
    return;
  }

  deployments.sort((a, b) => (a.created || 0) - (b.created || 0));

  const failedDeployments = [];

  for (const deployment of deployments) {
    const deploymentId = deployment.uid || deployment.id;
    const deploymentUrl = deployment.url ? `https://${deployment.url}` : 'N/A';
    const deploymentState = deployment.state || deployment.readyState || 'UNKNOWN';
    const createdAt = deployment.created || deployment.createdAt || 0;

    console.log('='.repeat(80));
    console.log(`Deployment ID: ${deploymentId}`);
    console.log(`URL: ${deploymentUrl}`);
    console.log(`State: ${deploymentState.toUpperCase()}`);
    console.log(`Created: ${formatDate(createdAt)}`);
    console.log('-'.repeat(80));

    try {
      const eventsUrl = `${API_BASE}/v2/deployments/${deploymentId}/events`;
      const eventsData = await fetchJson(eventsUrl);
      const events = Array.isArray(eventsData) ? eventsData : eventsData.events || [];

      if (events.length === 0) {
        console.log('No events returned for this deployment.');
        continue;
      }

      events.sort((a, b) => (a.createdAt || a.created || 0) - (b.createdAt || b.created || 0));

      const eventMessages = [];

      for (const event of events) {
        const created = event.createdAt || event.created || Date.now();
        const message = formatEventMessage(event);
        eventMessages.push(message);
        console.log(`${formatDate(created)} - ${message}`);
      }

      const likelyCauses = detectLikelyCauses(eventMessages);
      if (likelyCauses.length > 0) {
        console.log('Likely causes detected:');
        for (const cause of likelyCauses) {
          console.log(`  - ${cause}`);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch events for deployment ${deploymentId}: ${error.message}`);
    }

    console.log();

    if (deploymentState.toUpperCase() === 'ERROR') {
      failedDeployments.push({ id: deploymentId, url: deploymentUrl });
    }
  }

  console.log('FAILED DEPLOYMENTS');
  if (failedDeployments.length === 0) {
    console.log('  None 🎉');
  } else {
    for (const failed of failedDeployments) {
      console.log(`  - ${failed.id} (${failed.url})`);
    }
  }

  console.log();
  console.log(`Raw deployment data saved to: ${jsonPath}`);
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
