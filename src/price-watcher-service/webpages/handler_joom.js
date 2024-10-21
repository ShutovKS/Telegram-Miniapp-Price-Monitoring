import parse_webpage from "../tools/seleniom_tool.js";

async function parse_price_joom(url) {
    let result = await parse_webpage(url, 'price___Y4B7f');

    // Используем регулярное выражение для извлечения чисел, включая десятичные разделители
    let cleanedPrice = result[0].replace(/[^\d.,]/g, '');

    // Заменяем запятую на точку
    cleanedPrice = cleanedPrice.replace(',', '.');

    return cleanedPrice;
}

export default parse_price_joom;