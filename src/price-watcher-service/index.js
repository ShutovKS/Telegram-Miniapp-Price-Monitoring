const parse_price_joom = require("./webpages/handler_joom");

parse_price_joom('https://www.joom.com/ru-ua/products/64d738fbd95dd501e48b5298').then(result => {
    console.log(result);
});