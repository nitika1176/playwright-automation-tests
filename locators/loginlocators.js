const loginLocators = {
    emailField: 'input[name="email"]',
    passwordField: 'input[type="password"]',
    loginButton: 'button[title="Sign in"]',

    InvalidFormatEmailErrorMessage: '//span[text()="Please enter valid email."]', //Please enter valid email.

    InvalidLoginErrorMessage: '//span[text()="Invalid email or password."]', //Invalid email or password, we do not use hash for xpath

    RequiredEmailErrorMessage: '//span[text()="Email is required."]', //Email is required
    RequiredPasswordErrorMessage: '//span[text()="Password is required."]', //Password is required

};
module.exports = loginLocators;
