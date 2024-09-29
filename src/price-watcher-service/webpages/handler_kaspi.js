const parse_webpage = require('../tools/playwright_tool');

async function parse_price_kaspi(url) {
    let result = await parse_webpage(url, '.item__price-once');

    result = result.match(/\d+/)[0];

    return result;
}

module.exports = parse_price_kaspi;