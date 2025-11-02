import os
import requests
from dotenv import load_dotenv

# Load your .env file
load_dotenv(dotenv_path=".envs/local.env")

# Get keys
token = os.getenv("VERCEL_TOKEN")
project_id = os.getenv("VERCEL_PROJECT_ID")
project_name = os.getenv("VERCEL_PROJECT_NAME")

print("🔎 Checking Vercel connection...\n")

if not token or not project_id:
    print("❌ Missing token or project ID. Check .env.")
    raise SystemExit()

url = "https://api.vercel.com/v6/deployments"
headers = {"Authorization": f"Bearer {token}"}
params = {"projectId": project_id, "limit": 5}

response = requests.get(url, headers=headers, params=params)
print(f"Status Code: {response.status_code}\n")

if response.status_code == 200:
    data = response.json()
    deployments = data.get("deployments", [])
    print(f"✅ Found {len(deployments)} deployments.")
    if deployments:
        latest = deployments[0]
        print(f"🟩 Latest: {latest.get('name')} — {latest.get('url')}")
else:
    print("❌ Error:")
    print(response.text)
