const parse_price_perekrestok = require("./webpages/parsing_perekrestok");

let url = 'https://www.perekrestok.ru/cat/32/p/vinegret-ovosnoj-sef-perekrestok-180g-3681084';

parse_price_perekrestok(url).then(result => {
    console.log(result);
});

