const BasePage = require('./BasePage')
const locators = require('../locators/signuplocators');

class SignupPage extends BasePage{
    async signup(firstname,lastname,email,password,confirmpassword){
        await this.page.fill(locators.firstname, firstname);
        await this.page.fill(locators.lastname, lastname);
        await this.page.fill(locators.email, email);
        await this.page.fill(locators.password, password);
        await this.page.fill(locators.confirmpassword, confirmpassword);
    }
    async getSuccessMessage(){
        return await this.page.textContent(locators.successMessage);
    }
}
module.exports=SignupPage;