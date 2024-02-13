import { expect, test } from '@playwright/test';

for (const domType of ['shadow', 'light']) {
  test(`can find light link inside ${domType} details`, async ({ page }) => {
    await page.goto(`http://127.0.0.1:3000/${domType}-details.html`);

    // Make sure we find a link in light DOM.
    await expect.soft(page.getByRole('link').first()).toContainText("Playwright");

    // Make sure we find the details entirely contained in light or shadow DOM.
    await expect.soft(page.getByRole('group').filter({ hasText: "first" })).toContainText("details");

    // Now try to target the right link by the title of its <details> element:
    await expect.soft(
      page.getByRole('group')
        .filter({ hasText: "first" })
        .getByRole('link')
    ).toContainText("Playwright");
  });
}
