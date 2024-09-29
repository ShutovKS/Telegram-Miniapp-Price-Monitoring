const parse_webpage = require('../tools/python_seleniom_tool');

async function parse_price_joom(url) {
    let result = await parse_webpage(url, 'price___Y4B7f');

    // Используем регулярное выражение для извлечения чисел, включая десятичные разделители
    let cleanedPrice = result.replace(/[^\d.,]/g, '');

    // Заменяем запятую на точку
    cleanedPrice = cleanedPrice.replace(',', '.');

    return cleanedPrice;
}

module.exports = parse_price_joom;