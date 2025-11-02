import os
from dotenv import load_dotenv

# 1️⃣ Tell Python to load your .env file
load_dotenv(dotenv_path=".envs/local.env")

# 2️⃣ Check and print what Python can see
print("Checking environment variables...\n")

print("GEMINI_TOKEN:", os.getenv("GEMINI_TOKEN"))
print("JULES_TOKEN:", os.getenv("JULES_TOKEN"))
print("VERCEL_TOKEN:", os.getenv("VERCEL_TOKEN"))
print("VERCEL_PROJECT_ID:", os.getenv("VERCEL_PROJECT_ID"))
print("VERCEL_PROJECT_NAME:", os.getenv("VERCEL_PROJECT_NAME"))
print("LOCAL_GITHUB_AUDIOJONES_DEV:", os.getenv("LOCAL_GITHUB_AUDIOJONES_DEV"))

print("\n✅ If you see your mock values above (not 'None'), everything is connected.")
print("If any say 'None', Python can’t see that key yet.")
