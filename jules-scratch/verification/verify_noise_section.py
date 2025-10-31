from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Navigate to the homepage.
    page.goto("http://localhost:3000")

    # 2. Locate the new section's heading to confirm it's visible.
    # Using get_by_role for robustness.
    heading = page.get_by_role("heading", name="Stand Out in a World Flooded by AI Noise")

    # 3. Scroll the heading into view to ensure it's not obscured.
    heading.scroll_into_view_if_needed()

    # 4. Assert that the heading is visible on the page.
    # This ensures the component has rendered before taking the screenshot.
    expect(heading).to_be_visible()

    # 5. Take a screenshot for visual verification.
    page.screenshot(path="jules-scratch/verification/noise-authority-section.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)