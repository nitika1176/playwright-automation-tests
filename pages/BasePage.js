class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url, { timeout: 60000 }); // 60 seconds
    }

    async takeScreenshot(name) {
        await this.page.screenshot({ path: `reports/${name}.png`, fullPage: true });
    }
}
module.exports = BasePage;
