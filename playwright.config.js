const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000, 
  expect: { timeout: 20000 },
  reporter: [
    ['list', { open: 'never' }],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],
  use: {
    screenshot: 'on',
    video: 'off',
    actionTimeout: 0,
    navigationTimeout: 30000,
  },
  retries: 1,
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'iPhone 14', use: { browserName: 'webkit', ...devices['iPhone 14'] } },
    { name: 'Pixel 7', use: { browserName: 'chromium', ...devices['Pixel 7'] } },
  ],
});



