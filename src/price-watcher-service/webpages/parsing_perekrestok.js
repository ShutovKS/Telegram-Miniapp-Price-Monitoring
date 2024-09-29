const axios = require('axios');
const cheerio = require('cheerio');

async function parse_webpage(url, selectors) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let result = {};
        selectors.forEach(selector => {
            result[selector.name] = $(selector.selector).text();
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function parse_price_perekrestok(url) {
    let result = await parse_webpage(url, [
        {name: 'price', selector: '.sc-GTVdH .price-new'}
    ]);

    result = result['price'].match(/\d+/)[0];

    return result;
}

module.exports = parse_price_perekrestok;