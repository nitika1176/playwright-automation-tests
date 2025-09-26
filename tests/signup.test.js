const { test, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage');
const config = require('../config/config');

test.describe('Signup Tests - Full Coverage (70 Cases)', () => {

  // ---------------- First Name ----------------
  test.describe('First Name Field', () => {
    test('01 - Valid First Name', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("John", config.lastName, "user01@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('02 - Empty First Name', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("", config.lastName, "user02@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("First name required");
    });

    test('03 - First Name Only Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("   ", config.lastName, "user03@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("First name required");
    });

    test('04 - First Name With Numbers', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("1234", config.lastName, "user04@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid first name");
    });

    test('05 - First Name With Special Characters', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("@#$%", config.lastName, "user05@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid first name");
    });

    test('06 - First Name With Hyphen', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("Mary-Jane", config.lastName, "user06@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('07 - First Name With Apostrophe', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("O’Connor", config.lastName, "user07@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('08 - First Name Too Long', async ({ page }) => {
      const longName = "A".repeat(60);
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(longName, config.lastName, "user08@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("First name too long");
    });

    test('09 - First Name With Leading/Trailing Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(" John ", config.lastName, "user09@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('10 - First Name Mixed Case', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("jOhN", config.lastName, "user10@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });
  });

  // ---------------- Last Name ----------------
  test.describe('Last Name Field', () => {
    test('11 - Valid Last Name', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "Smith", "user11@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('12 - Empty Last Name', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "", "user12@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Last name required");
    });

    test('13 - Last Name Only Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "   ", "user13@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Last name required");
    });

    test('14 - Last Name With Numbers', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "1234", "user14@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid last name");
    });

    test('15 - Last Name With Special Characters', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "@#$%", "user15@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid last name");
    });

    test('16 - Last Name With Hyphen', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "Doe-Smith", "user16@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('17 - Last Name With Apostrophe', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "O’Neil", "user17@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('18 - Last Name Too Long', async ({ page }) => {
      const longName = "B".repeat(60);
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, longName, "user18@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Last name too long");
    });

    test('19 - Last Name With Leading/Trailing Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, " Smith ", "user19@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('20 - Last Name Lowercase', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "smith", "user20@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });
  });

  // ---------------- Email ----------------
  test.describe('Email Field', () => {
    test('21 - Valid Email', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user21@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('22 - Empty Email', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Email required");
    });

    test('23 - Email Only Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "   ", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Email required");
    });

    test('24 - Invalid Email Without @', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "testexample.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid email");
    });

    test('25 - Invalid Email Without Domain', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "test@", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid email");
    });

    test('26 - Invalid Email Without TLD', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "test@example", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid email");
    });

    test('27 - Email With Invalid Characters', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "test@exa!mple.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid email");
    });

    test('28 - Multiple @ Symbols', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "test@@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid email");
    });

    test('29 - Email With Subdomain', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user@mail.example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('30 - Email With Numbers', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user123@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('31 - Email With Hyphen', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "first-last@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('32 - Email With Period In Local Part', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "first.last@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('33 - Uppercase Email', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "TEST@EXAMPLE.COM", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('34 - Duplicate Email Already Registered', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, config.email, config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Email already exists");
    });

    test('35 - Email Too Long', async ({ page }) => {
      const longEmail = "a".repeat(245) + "@example.com";
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, longEmail, config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getErrorMessage()).toContain("Email too long");
    });
  });

  // ---------------- Password ----------------
  test.describe('Password Field', () => {
    test('36 - Valid Password', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user36@example.com", "StrongPass1!", "StrongPass1!", true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('37 - Empty Password', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user37@example.com", "", "", true, true);
      expect(await signup.getErrorMessage()).toContain("Password required");
    });

    test('38 - Password Only Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user38@example.com", "   ", "   ", true, true);
      expect(await signup.getErrorMessage()).toContain("Password required");
    });

    test('39 - Password Too Short', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user39@example.com", "Ab1!", "Ab1!", true, true);
      expect(await signup.getErrorMessage()).toContain("Password too short");
    });

    test('40 - Password Without Uppercase', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user40@example.com", "lowercase1!", "lowercase1!", true, true);
      expect(await signup.getErrorMessage()).toContain("Password must include uppercase");
    });

    test('41 - Password Without Lowercase', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user41@example.com", "UPPERCASE1!", "UPPERCASE1!", true, true);
      expect(await signup.getErrorMessage()).toContain("Password must include lowercase");
    });

    test('42 - Password Without Digit', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user42@example.com", "NoDigit!", "NoDigit!", true, true);
      expect(await signup.getErrorMessage()).toContain("Password must include digit");
    });

    test('43 - Password Without Special Character', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user43@example.com", "Password1", "Password1", true, true);
      expect(await signup.getErrorMessage()).toContain("Password must include special character");
    });

    test('44 - Very Strong Password', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user44@example.com", "Aa1!Aa1!Aa1!", "Aa1!Aa1!Aa1!", true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('45 - Password Too Long', async ({ page }) => {
      const longPass = "A1!".repeat(100);
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user45@example.com", longPass, longPass, true, true);
      expect(await signup.getErrorMessage()).toContain("Password too long");
    });

    test('46 - Password Same As First Name', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("John", config.lastName, "user46@example.com", "John", "John", true, true);
      expect(await signup.getErrorMessage()).toContain("Weak password");
    });

    test('47 - Password Same As Last Name', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, "Smith", "user47@example.com", "Smith", "Smith", true, true);
      expect(await signup.getErrorMessage()).toContain("Weak password");
    });

    test('48 - Password Same As Email', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "samepass@example.com", "samepass@example.com", "samepass@example.com", true, true);
      expect(await signup.getErrorMessage()).toContain("Weak password");
    });

    test('49 - Password With Spaces Inside', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user49@example.com", "Pass word1!", "Pass word1!", true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid password");
    });

    test('50 - Password Repeated Characters Only', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user50@example.com", "aaaaaaaaaa", "aaaaaaaaaa", true, true);
      expect(await signup.getErrorMessage()).toContain("Weak password");
    });
  });

  // ---------------- Confirm Password ----------------
  test.describe('Confirm Password Field', () => {
    test('51 - Matching Confirm Password', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user51@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('52 - Confirm Password Mismatch', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user52@example.com", config.signupPassword, "WrongPass", true, true);
      expect(await signup.getErrorMessage()).toContain("Passwords do not match");
    });

    test('53 - Confirm Password Empty', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user53@example.com", config.signupPassword, "", true, true);
      expect(await signup.getErrorMessage()).toContain("Confirm password required");
    });

    test('54 - Confirm Password Only Spaces', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user54@example.com", config.signupPassword, "   ", true, true);
      expect(await signup.getErrorMessage()).toContain("Confirm password required");
    });

    test('55 - Confirm Password Case Sensitive Mismatch', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user55@example.com", "Password1!", "password1!", true, true);
      expect(await signup.getErrorMessage()).toContain("Passwords do not match");
    });
  });

  // ---------------- Robot Checkbox ----------------
  test.describe('Robot Checkbox', () => {
    test('56 - Robot Checkbox Checked', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user56@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('57 - Robot Checkbox Not Checked', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user57@example.com", config.signupPassword, config.signupPassword, false, true);
      expect(await signup.getErrorMessage()).toContain("Please confirm you are not a robot");
    });

    test('58 - Robot Checkbox Invalid State Simulation', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      // force skip robot check
      await signup.signup(config.firstName, config.lastName, "user58@example.com", config.signupPassword, config.signupPassword, null, true);
      expect(await signup.getErrorMessage()).toContain("Robot verification required");
    });

    test('59 - Robot Checkbox With Delay Before Check', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await page.waitForTimeout(500);
      await signup.signup(config.firstName, config.lastName, "user59@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('60 - Robot Checkbox Reset After Error', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user60@example.com", config.signupPassword, config.signupPassword, false, true);
      expect(await signup.getErrorMessage()).toContain("Please confirm you are not a robot");
      // now retry with correct checkbox
      await signup.signup(config.firstName, config.lastName, "user60@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });
  });

  // ---------------- Terms & Conditions ----------------
  test.describe('Terms & Conditions Checkbox', () => {
    test('61 - Terms Checkbox Checked', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user61@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('62 - Terms Checkbox Not Checked', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user62@example.com", config.signupPassword, config.signupPassword, true, false);
      expect(await signup.getErrorMessage()).toContain("You must accept terms and conditions");
    });

    test('63 - Terms Checkbox Invalid State Simulation', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user63@example.com", config.signupPassword, config.signupPassword, true, null);
      expect(await signup.getErrorMessage()).toContain("Terms acceptance required");
    });

    test('64 - Terms Checkbox With Delay Before Check', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await page.waitForTimeout(500);
      await signup.signup(config.firstName, config.lastName, "user64@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('65 - Terms Checkbox Reset After Error', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup(config.firstName, config.lastName, "user65@example.com", config.signupPassword, config.signupPassword, true, false);
      expect(await signup.getErrorMessage()).toContain("You must accept terms and conditions");
      await signup.signup(config.firstName, config.lastName, "user65@example.com", config.signupPassword, config.signupPassword, true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });
  });

  // ---------------- End-to-End Flow ----------------
  test.describe('End-to-End Flow', () => {
    test('66 - Valid Full Signup Flow', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("Alice", "Johnson", "user66@example.com", "StrongPass1!", "StrongPass1!", true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });

    test('67 - Signup With All Fields Empty', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("", "", "", "", "", false, false);
      expect(await signup.getErrorMessage()).toContain("All fields are required");
    });

    test('68 - Signup With Partial Data', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("Bob", "", "user68@example.com", "StrongPass1!", "StrongPass1!", true, true);
      expect(await signup.getErrorMessage()).toContain("Last name required");
    });

    test('69 - Signup With Wrong Email and Password Mismatch', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");
      await signup.signup("Charlie", "Brown", "wrongemail", "Password1!", "Password2!", true, true);
      expect(await signup.getErrorMessage()).toContain("Invalid email");
    });

    test('70 - Successful Signup After Multiple Failed Attempts', async ({ page }) => {
      const signup = new SignupPage(page);
      await signup.navigateTo(config.baseURL + "/signup");

      // fail 1
      await signup.signup("", "", "bad", "123", "321", false, false);
      expect(await signup.getErrorMessage()).toBeTruthy();

      // fail 2
      await signup.signup("Bad", "User", "user70@example.com", "short", "short", true, true);
      expect(await signup.getErrorMessage()).toBeTruthy();

      // success
      await signup.signup("David", "Clark", "user70@example.com", "StrongPass1!", "StrongPass1!", true, true);
      expect(await signup.getSuccessMessage()).toContain("Signup Successful");
    });
  });

});
