import parse_price_joom from "./webpages/handler_joom.js";

parse_price_joom('https://www.joom.com/ru-ua/products/64d738fbd95dd501e48b5298').then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});