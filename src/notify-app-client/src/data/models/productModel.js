// CREATE TABLE products
// (
//     id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     marketplace_id UUID REFERENCES marketplaces (id) ON DELETE CASCADE,
//     product_name   VARCHAR(255)   NOT NULL,
//     product_url    TEXT           NOT NULL,
//     current_price  DECIMAL(10, 2) NOT NULL,
//     last_price     DECIMAL(10, 2),
//     min_price      DECIMAL(10, 2),
//     max_price      DECIMAL(10, 2),
//     created_at     TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
//     updated_at     TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
// );

class ProductModel {
    constructor({id, productName, productUrl, currentPrice, lastPrice = null, minPrice = null, maxPrice = null}) {
        this.id = id;
        this.productName = productName;
        this.productUrl = productUrl;
        this.currentPrice = currentPrice;
        this.lastPrice = lastPrice;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}

export default ProductModel;
