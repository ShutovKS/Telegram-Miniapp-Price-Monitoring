import parse_webpage from "../tools/playwright_tool.js";

async function parse_price_kaspi(url) {
    let result = await parse_webpage(url, '.item__price-once');

    result = result.match(/\d+/)[0];

    return result;
}

export default parse_price_kaspi;