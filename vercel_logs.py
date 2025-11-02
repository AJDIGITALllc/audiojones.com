"""
AUDIO JONES VERCEL LOG ANALYZER
--------------------------------
Pulls the most recent deployment from Vercel,
downloads its build logs, and provides a quick summary.
"""

import os
import requests
from dotenv import load_dotenv

# Load .env
load_dotenv(dotenv_path=".envs/local.env")

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
PROJECT_ID = os.getenv("VERCEL_PROJECT_ID")

if not VERCEL_TOKEN or not PROJECT_ID:
    print("❌ Missing Vercel token or project ID. Check your .env.")
    raise SystemExit()

print("🔎 Fetching latest Vercel deployment logs...\n")

# Step 1 — Get deployments
headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
deployments_url = f"https://api.vercel.com/v6/deployments?projectId={PROJECT_ID}&limit=1"
res = requests.get(deployments_url, headers=headers)

if res.status_code != 200:
    print(f"❌ Error fetching deployments: {res.status_code}")
    print(res.text)
    raise SystemExit()

data = res.json()
if not data.get("deployments"):
    print("⚠️ No deployments found.")
    raise SystemExit()

latest = data["deployments"][0]
deployment_id = latest["uid"]
print(f"🟩 Latest deployment ID: {deployment_id}")
print(f"URL: {latest.get('url')}")
print(f"State: {latest.get('state')}\n")

# Step 2 — Get deployment logs
logs_url = f"https://api.vercel.com/v2/deployments/{deployment_id}/events"
logs_res = requests.get(logs_url, headers=headers)

if logs_res.status_code != 200:
    print(f"❌ Error fetching logs: {logs_res.status_code}")
    print(logs_res.text)
    raise SystemExit()

logs_data = logs_res.json()

print("📄 Deployment Events:\n")

events = logs_data.get("events", [])
for event in events[:20]:  # only show first 20 for readability
    print(f"- [{event.get('type')}] {event.get('payload', {}).get('message', '')}")

print("\n✅ Logs fetched successfully.")

# Step 3 (optional) — Prepare text for AI analysis
log_summary = "\n".join(
    f"[{e.get('type')}] {e.get('payload', {}).get('message', '')}" for e in events[:50]
)
if log_summary.strip():
    print("\n🧠 Ready to send logs to Gemini or Jules for analysis.")
else:
    print("⚠️ No readable logs available.")
