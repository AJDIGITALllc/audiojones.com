from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000", wait_until="load")

        # Accept the cookie banner
        try:
            cookie_banner_button = page.locator('button:has-text("Accept All")')
            cookie_banner_button.click(timeout=5000)
        except Exception as e:
            print(f"Cookie banner not found or could not be clicked: {e}")

        # Wait for the main headline to be visible before taking the screenshot
        h1_locator = page.locator("h1")
        expect(h1_locator).to_be_visible(timeout=20000)

        page.screenshot(path="jules-scratch/verification/hero_screenshot.png")
        browser.close()

run()