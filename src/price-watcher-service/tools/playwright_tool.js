import {chromium} from "playwright";

async function parse_webpage(url, selector) {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector(selector);

        const result = await page.$eval(selector, element => element.textContent.trim());

        await browser.close();

        return result;
    } catch (error) {
        console.error(error);
    }
}

export default parse_webpage;
