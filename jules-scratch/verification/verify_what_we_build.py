from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for the section to be visible
        what_we_build_section = page.locator('section:has-text("What We Build")')
        what_we_build_section.wait_for(state='visible')

        # Take a screenshot of the section
        what_we_build_section.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run()