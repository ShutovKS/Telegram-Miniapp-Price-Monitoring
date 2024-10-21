import axios from "axios";
import cheerio from "cheerio";

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

export default parse_webpage;