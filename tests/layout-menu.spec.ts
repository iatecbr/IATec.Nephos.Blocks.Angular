import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4200';

test.describe('Menu Layout', () => {
    test.beforeAll(async () => {
        // Check if server is running
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                console.warn('Server may not be running. Make sure to start the dev server first.');
            }
        } catch (e) {
            console.warn(`Cannot connect to ${BASE_URL}. Make sure the dev server is running.`);
        }
    });

    test('should display menu items correctly', async ({ page }) => {
        await page.goto(BASE_URL);
        
        // Wait for layout to load
        await page.waitForSelector('.layout-container', { timeout: 30000 });
        
        // Check if menu items are present
        const menuItems = await page.locator('.layout-menu > li').count();
        console.log(`Found ${menuItems} top-level menu items`);
        
        // Expect at least Dashboards and Examples
        expect(menuItems).toBeGreaterThanOrEqual(2);
    });

    test('should expand submenu on click', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForSelector('.layout-container', { timeout: 30000 });
        
        // Find "Examples" menu item and click
        const examplesMenu = page.locator('.layout-menuitem-text', { hasText: 'Examples' });
        await examplesMenu.click();
        
        // Wait for submenu to appear (ul should have children)
        const submenu = examplesMenu.locator('..').locator('ul');
        const submenuItems = await submenu.locator('li').count();
        console.log(`Found ${submenuItems} submenu items`);
        
        expect(submenuItems).toBeGreaterThanOrEqual(1);
    });

    test('should highlight active route', async ({ page }) => {
        await page.goto(`${BASE_URL}/examples/pages/empty`);
        await page.waitForSelector('.layout-container', { timeout: 30000 });
        
        // Check if "Empty Page" has active class
        const emptyPageLink = page.locator('.layout-menuitem-text', { hasText: 'Empty Page' });
        const isActive = await emptyPageLink.evaluate(el => 
            el.closest('li')?.classList.contains('active-menuitem')
        );
        
        expect(isActive).toBe(true);
    });

    test('should navigate to route on menu click', async ({ page }) => {
        await page.goto(BASE_URL);
        await page.waitForSelector('.layout-container', { timeout: 30000 });
        
        // Click on Empty Page
        const emptyPageLink = page.locator('.layout-menuitem-text', { hasText: 'Empty Page' });
        await emptyPageLink.click();
        
        // Check URL changed
        await expect(page).toHaveURL(/.*/examples/pages/empty/);
    });
});
