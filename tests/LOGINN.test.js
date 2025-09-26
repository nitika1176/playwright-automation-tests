const { test, expect } = require('@playwright/test');
const config = require('../config/config');
const LoginPage = require('../pages/LoginPage');

test.describe('LOGINN Tests - 20 Scenarios', () => {

  // 1. Valid login
  test('valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.validEmail);
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    // Add assertion for successful login
  });


  // 2. Invalid email without domain, valid password   Email format is invalid
  test('invalid email without domain & valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.invalidEmailwithoutDomain);
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    const InvalidFormatEmailErrorMessage = await loginPage.getInvalidEmailFormatMessage();
    expect(InvalidFormatEmailErrorMessage).toContain('Email format is invalid');
  });


  // 3. Invalid email with domain, valid password    Invalid email or password
  test('invalid email with domain & valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.invalidEmailwithDomain);
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    const InvalidFormatEmailErrorMessage = await loginPage.getInvalidEmailFormatMessage();
    expect(InvalidFormatEmailErrorMessage).toContain('Email format is invalid');
  });

  // 4. Valid email & invalid password   Invalid email or password
  test('valid email & invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.validEmail);
    await loginPage.enterPassword(config.invalidPassword);
    await loginPage.clickLogin();
    const InvalidLoginErrorMessage = await loginPage.getInvalidLoginErrorMessage();
    expect(InvalidLoginErrorMessage).toContain('Invalid email or password');
  });


  // 5. Empty email & valid password     Email is required
  test('empty email & valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail('');
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    const RequiredEmailErrorMessage = await loginPage.getRequiredEmailErrorMessage();
    expect(RequiredEmailErrorMessage).toContain('Email is required');
  });


  // 6. Valid email & empty password    Password is required
  test('valid email & empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.validEmail);
    await loginPage.enterPassword('');
    await loginPage.clickLogin();
    const RequiredPasswordErrorMessage = await loginPage.getRequiredPasswordErrorMessage();
    expect(RequiredPasswordErrorMessage).toContain('Password is required');
  });

  // 7. Both email & password empty
 // test('empty email & empty password', async ({ page }) => {
   // const loginPage = new LoginPage(page);
    //await loginPage.navigateTo(config.baseURL);
   // await loginPage.enterEmail('');
    //await loginPage.enterPassword('');
    //await loginPage.clickLogin();
    //const emailErrorMessage = await loginPage.getErrorMessage();
    //expect(emailErrorMessage).toContain('Email is required');
  //});

  // 8. Email with spaces & valid password  Email is required
  test('email with spaces & valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail('   '); 
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    const RequiredEmailErrorMessage = await loginPage.getRequiredEmailErrorMessage();
    expect(RequiredEmailErrorMessage).toContain('Email is required');
  });

  // 9. Email with special chars & valid password     Email format is invalid
  test('email with special chars & valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail('invalid@@email.com');
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    const InvalidFormatEmailErrorMessage = await loginPage.getInvalidEmailFormatMessage();
    expect(InvalidFormatEmailErrorMessage).toContain('Email format is invalid');
  });



  
  

  // 12. Invalid email format (missing @) & valid password
  test('invalid email missing @ & valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.invalidEmailwithoutatTheRate);
    await loginPage.enterPassword(config.validPassword);
    await loginPage.clickLogin();
    const InvalidFormatEmailErrorMessage = await loginPage.getInvalidEmailFormatMessage();
    expect(InvalidFormatEmailErrorMessage).toContain('Email format is invalid');
  });



  // 13. Valid email & SQL injection in password
  test('valid email & SQL injection in password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.baseURL);
    await loginPage.enterEmail(config.validEmail);
    await loginPage.enterPassword("' OR '1'='1");  // SQL injection attempt
    await loginPage.clickLogin();

    const InvalidLoginErrorMessage = await loginPage.getInvalidLoginErrorMessage(); 
    expect(InvalidLoginErrorMessage).toContain('Invalid email or password');
  });

//   // 14. Email with leading/trailing spaces & valid password
//   test('email with spaces around & valid password', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail('  valid@test.com  ');
//     await loginPage.enterPassword(config.validPassword);
//     await loginPage.clickLogin();
//     const loginErrorMessage = await loginPage.getLoginErrorMessage();
//     expect(loginErrorMessage).toContain('Invalid email or password'); // if trimmed, adjust
//   });

//   // 15. Valid email & password with special chars
//   test('valid email & password with special chars', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail(config.validEmail);
//     await loginPage.enterPassword('!@#$%^&*()');
//     await loginPage.clickLogin();
//     const loginErrorMessage = await loginPage.getLoginErrorMessage();
//     expect(loginErrorMessage).toContain('Invalid email or password');
//   });

//   // 16. Email numeric only & valid password
//   test('numeric email & valid password', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail('123456@test.com');
//     await loginPage.enterPassword(config.validPassword);
//     await loginPage.clickLogin();
//     const loginErrorMessage = await loginPage.getLoginErrorMessage();
//     expect(loginErrorMessage).toContain('Invalid email or password');
//   });

//   // 17. Email missing domain & empty password
//   test('email missing domain & empty password', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail('user@');
//     await loginPage.enterPassword('');
//     await loginPage.clickLogin();
//     const emailErrorMessage = await loginPage.getErrorMessage();
//     expect(emailErrorMessage).toContain('Email format is invalid');
//   });

//   // 18. Empty email & password with special chars
//   test('empty email & special password', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail('');
//     await loginPage.enterPassword('!@#$');
//     await loginPage.clickLogin();
//     const emailErrorMessage = await loginPage.getErrorMessage();
//     expect(emailErrorMessage).toContain('Email is required');
//   });

//   // 19. Email with emoji & valid password
//   test('email with emoji & valid password', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail('user😀@test.com');
//     await loginPage.enterPassword(config.validPassword);
//     await loginPage.clickLogin();
//     const emailErrorMessage = await loginPage.getErrorMessage();
//     expect(emailErrorMessage).toContain('Email format is invalid');
//   });

//   // 20. Valid email & password with trailing spaces
//   test('valid email & password with trailing spaces', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigateTo(config.baseURL);
//     await loginPage.enterEmail(config.validEmail);
//     await loginPage.enterPassword('password   ');
//     await loginPage.clickLogin();
//     const loginErrorMessage = await loginPage.getLoginErrorMessage();
//     expect(loginErrorMessage).toContain('Invalid email or password');
//   });

  // test('SQL injection in email & valid password', async ({ page }) => {
  // const loginPage = new LoginPage(page);
  // await loginPage.navigateTo(config.baseURL);
  // await loginPage.enterEmail("' OR '1'='1");  // common SQL injection string
  // await loginPage.enterPassword(config.validPassword);
  // await loginPage.clickLogin();

  // const emailErrorMessage = await loginPage.getErrorMessage();
  // expect(emailErrorMessage).toContain('Email format is invalid');
  //   });




});
