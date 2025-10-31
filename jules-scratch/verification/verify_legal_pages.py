from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    pages_to_verify = [
        "privacy-policy",
        "terms-of-service",
        "cancellation-policy",
        "cookie-policy",
        "studio-policy",
        "consent-testimonial",
    ]

    for p in pages_to_verify:
        page.goto(f"http://localhost:3000/{p}")
        page.screenshot(path=f"jules-scratch/verification/{p}.png")

    # Verify Cookie Banner
    page.goto("http://localhost:3000")
    cookie_banner = page.locator("text=We use cookies")
    cookie_banner.wait_for()
    page.screenshot(path="jules-scratch/verification/cookie-banner.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
