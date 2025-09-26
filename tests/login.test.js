const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const config = require('../config/config');

test.describe('Login Tests - 40 Test Cases', () => {

    // ✅ 1. Successful Login
    test('Valid Login', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, config.validPassword, true);
        const success = await login.getSuccessMessage();
        expect(success).toContain("Login Successful");
    });

    // ❌ 2. Both fields empty
    test('Both Email and Password Empty', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("", "", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Email and Password required");
    });

    // ❌ 3. Empty Email
    test('Empty Email with Password Entered', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Email is required");
    });

    // ❌ 4. Empty Password
    test('Empty Password with Email Entered', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Password is required");
    });

    // ❌ 5. Invalid Email Format - Missing @
    test('Invalid Email Format - Missing @', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("invalidemail.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 6. Invalid Email Format - Missing domain
    test('Invalid Email Format - Missing domain', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("test@", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 7. Incorrect Password
    test('Incorrect Password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "WrongPass123", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 8. Unregistered Email
    test('Unregistered Email', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("nouser@test.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("User not found");
    });

    // ❌ 9. Email with spaces
    test('Email with Leading/Trailing Spaces', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("   " + config.validEmail + "   ", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 10. Password with spaces
    test('Password with Leading/Trailing Spaces', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "   " + config.validPassword + "   ", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ✅ 11. Uppercase Email
    test('Uppercase Email should login successfully', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail.toUpperCase(), config.validPassword, true);
        const success = await login.getSuccessMessage();
        expect(success).toContain("Login Successful");
    });

    // ❌ 12. Wrong Email + Correct Password
    test('Wrong Email with Correct Password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("wrong@test.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("User not found");
    });

    // ❌ 13. Correct Email + Wrong Password
    test('Correct Email with Wrong Password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "Wrong123!", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 14. SQL Injection in Email
    test('SQL Injection Attempt in Email', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("' OR 1=1 --", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 15. SQL Injection in Password
    test('SQL Injection Attempt in Password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "' OR '1'='1", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 16. XSS in Email
    test('XSS Attempt in Email', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("<script>alert(1)</script>", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 17. XSS in Password
    test('XSS Attempt in Password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "<script>alert(1)</script>", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 18. Very Long Email
    test('Very Long Email (>256 chars)', async ({ page }) => {
        const login = new LoginPage(page);
        const longEmail = "a".repeat(260) + "@test.com";
        await login.navigateTo(config.baseURL + "/login");
        await login.login(longEmail, config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 19. Very Long Password
    test('Very Long Password (>256 chars)', async ({ page }) => {
        const login = new LoginPage(page);
        const longPassword = "a".repeat(300);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, longPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 20. Login without checking robot
    test('Login without checking I am not a robot', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, config.validPassword, false);
        const error = await login.getErrorMessage();
        expect(error).toContain("Please verify you are not a robot");
    });

    // EXTRA 20 TEST CASES (21 - 40)

    // ❌ 21. Invalid email - only numbers
    test('Email field only numbers', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("123456", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 22. Invalid email - only special chars
    test('Email field only special characters', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("!@#$%", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 23. Password only numbers
    test('Password only numbers', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "1234567890", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 24. Password only letters
    test('Password only letters', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "abcdefghij", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 25. Password only special chars
    test('Password only special characters', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "!@#$%^&*", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 26. Empty Email + Empty Password + unchecked robot
    test('All fields empty including robot checkbox', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("", "", false);
        const error = await login.getErrorMessage();
        expect(error).toContain("Email and Password required");
    });

    // ❌ 27. Email case sensitivity
    test('Email with mixed case', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("TesTUser@Test.Com", config.validPassword, true);
        const success = await login.getSuccessMessage();
        expect(success).toContain("Login Successful");
    });

    // ❌ 28. Password case sensitivity
    test('Password case sensitivity', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, config.validPassword.toUpperCase(), true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 29. Email field blank spaces
    test('Email field blank spaces only', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("     ", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Email is required");
    });

    // ❌ 30. Password field blank spaces
    test('Password field blank spaces only', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "     ", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Password is required");
    });

    // ❌ 31. Invalid Email with multiple @
    test('Invalid Email - multiple @ symbols', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("test@@example.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid email format");
    });

    // ❌ 32. Email with valid but uncommon domain
    test('Valid email with uncommon domain', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("user@domain.xyz", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("User not found");
    });

    // ❌ 33. Password too short
    test('Password less than 6 characters', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, "123", true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Password too short");
    });

    // ❌ 34. Password too long
    test('Password longer than 100 characters', async ({ page }) => {
        const login = new LoginPage(page);
        const longPassword = "A".repeat(120);
        await login.navigateTo(config.baseURL + "/login");
        await login.login(config.validEmail, longPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Invalid credentials");
    });

    // ❌ 35. Login attempt with expired account
    test('Login attempt with expired account', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("expired@test.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Account expired");
    });

    // ❌ 36. Login attempt with locked account
    test('Login attempt with locked account', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("locked@test.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Account locked");
    });

    // ❌ 37. Login attempt with unverified email
    test('Login attempt with unverified email', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("unverified@test.com", config.validPassword, true);
        const error = await login.getErrorMessage();
        expect(error).toContain("Email not verified");
    });

    // ❌ 38. Login after multiple failed attempts (rate limit)
    test('Login blocked after multiple failed attempts', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        for (let i = 0; i < 5; i++) {
            await login.login(config.validEmail, "WrongPass", true);
        }
        const error = await login.getErrorMessage();
        expect(error).toContain("Too many failed attempts");
    });

    // ❌ 39. Login with disabled robot verification (bypassed)
    test('Login bypassing robot verification field', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        // here pass true but assume checkbox hidden
        await login.login(config.validEmail, config.validPassword, null);
        const error = await login.getErrorMessage();
        expect(error).toContain("Robot verification required");
    });

    // ✅ 40. Successful login with edge-case email
    test('Valid login with dot in email', async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigateTo(config.baseURL + "/login");
        await login.login("first.last@test.com", config.validPassword, true);
        const success = await login.getSuccessMessage();
        expect(success).toContain("Login Successful");
    });

});
