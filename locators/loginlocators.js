const loginLocators = {
    emailField: "#email",
    passwordField: "#password",
    loginButton: "[data-test='login-submit']",

    InvalidFormatEmailErrorMessage: "[data-test='email-error']", //Email format is invalid

    InvalidLoginErrorMessage: "//div[text()='Invalid email or password']", //Invalid email or password, we do not use hash for xpath

    RequiredEmailErrorMessage: "//div[text()='Email is required']", //Email is required
    RequiredPasswordErrorMessage: "//div[text()='Password is required']", //Password is required

};
module.exports = loginLocators;
