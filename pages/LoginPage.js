// pages/LoginPage.js
const { expect } = require('@playwright/test');   // <-- make sure expect is imported
const BasePage = require('./BasePage');
const loginLocators = require('../locators/loginlocators'); // Correct import

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Convenience method for full login
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // Separate methods for more control
  async enterEmail(email) {
    await this.page.fill(loginLocators.emailField, email);
  }

  async enterPassword(password) {
    await this.page.fill(loginLocators.passwordField, password);
  }

  async clickLogin() {
    const button = this.page.locator(loginLocators.loginButton);
    await expect(button).toBeVisible();   // uses global expect.timeout
    await button.click();
  }

  //Email format is invalid
  async getInvalidEmailFormatMessage() {
    const errorElement = this.page.locator(loginLocators.InvalidFormatEmailErrorMessage);
    await expect(errorElement).toBeVisible();   // global timeout
    return await errorElement.textContent();
  }
//Invalid email or password
  async getInvalidLoginErrorMessage() {
    const errorElement = this.page.locator(loginLocators.InvalidLoginErrorMessage);
    await expect(errorElement).toBeVisible();   // global timeout
    return await errorElement.textContent();
  }

  async getRequiredEmailErrorMessage(){
    const errorElement=this.page.locator(loginLocators.RequiredEmailErrorMessage);
    await expect(errorElement).toBeVisible();
    return await errorElement.textContent();


  }
  async getRequiredPasswordErrorMessage(){
    const errorElement=this.page.locator(loginLocators.RequiredPasswordErrorMessage);
    await expect(errorElement).toBeVisible();
    return await errorElement.textContent();


  }


}

module.exports = LoginPage;


