import parse_webpage from "../tools/axios_and_cheerio_tool.js";

async function parse_price_perekrestok(url) {
    let result = await parse_webpage(url, [
        {name: 'price', selector: '.sc-GTVdH .price-new'}
    ]);

    result = result['price'].match(/\d+/)[0];

    return result;
}

export default parse_price_perekrestok;