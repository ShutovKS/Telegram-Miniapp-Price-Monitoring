async function parse_webpage(url, selectors) {
    try {
        const requestData = {
            url: url,
            selectors: selectors
        };

        const response = await fetch('http://127.0.0.1:5000/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.statusText}`);
        }

        const result = await response.json();
        return result.result;
    } catch
        (error) {
        console.error(error);
    }
}


module.exports = parse_webpage;