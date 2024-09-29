const puppeteer = require('puppeteer');

async function parse_webpage(url, selector) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, {waitUntil: 'networkidle0'});

        await page.waitForSelector(selector);

        const content = await page.content();

        const result = await page.evaluate(() => {
            return document.querySelector(selector).innerText;
        });

        await browser.close();
        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = parse_webpage;
