const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000, // overall timeout per test
  expect: {
    timeout: 20000, // default timeout for expect()
  },
  reporter: [
    ['list', { open: 'never' }], // ✔ Clean console logs (lists all tests with status)
    ['html', { open: 'never' }], // ✔ HTML report
    ['allure-playwright'],       // ✔ Allure report (optional)
  ],
  use: {
    screenshot: 'on',            // 📸 Screenshot for all tests
    video: 'off',                // 🎥 No video recording by default
    actionTimeout: 0,
    navigationTimeout: 30000,
  },
  retries: 0, // You can adjust retries if needed
});



