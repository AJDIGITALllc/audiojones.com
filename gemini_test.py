import os, requests
from dotenv import load_dotenv

load_dotenv()

gemini = os.getenv("GEMINI_TOKEN")
if not gemini:
    print("❌ GEMINI_TOKEN missing — add it to your .env file.")
    raise SystemExit

print("✅ GEMINI_TOKEN loaded successfully.")
print("Testing Gemini 2.5-Flash API call...")

r = requests.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    params={"key": gemini},
    headers={"Content-Type": "application/json"},
    json={
        "contents": [
            {
                "parts": [
                    {"text": "Say hello to Audio Jones and confirm the Gemini 2.5-Flash API is working correctly."}
                ]
            }
        ]
    },
)

print("Status:", r.status_code)
print("Response:")
print(r.text[:400])
