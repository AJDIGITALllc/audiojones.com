import os, requests
from dotenv import load_dotenv

# load your scoped dev file
load_dotenv(dotenv_path=".envs/.local_dev.env")

token = os.getenv("VERCEL_TOKEN")
project = os.getenv("VERCEL_PROJECT_NAME")
team = os.getenv("VERCEL_TEAM_ID")

print("VERCEL_TOKEN:", "SET" if token else "NOT SET")
print("VERCEL_PROJECT_NAME:", project or "NOT SET")
print("VERCEL_TEAM_ID:", team or "NOT SET")
print()

if not token or not project:
    print("❌ Missing VERCEL_TOKEN or VERCEL_PROJECT_NAME in .envs/.local_dev.env")
    raise SystemExit

params = {"projectId": project, "limit": 3}
if team:
    params["teamId"] = team

resp = requests.get(
    "https://api.vercel.com/v6/deployments",
    headers={"Authorization": f"Bearer {token}"},
    params=params,
)

print("HTTP status:", resp.status_code)
print("Raw response:")
print(resp.text)
