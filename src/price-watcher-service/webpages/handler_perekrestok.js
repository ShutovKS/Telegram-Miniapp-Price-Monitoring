const parse_webpage = require("../tools/axios_and_cheerio_tool");

async function parse_price_perekrestok(url) {
    let result = await parse_webpage(url, [
        {name: 'price', selector: '.sc-GTVdH .price-new'}
    ]);

    result = result['price'].match(/\d+/)[0];

    return result;
}

module.exports = parse_price_perekrestok;