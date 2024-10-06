import Product from "./product.js";
import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const PriceHistory = sequelize.define('PriceHistory', {
    product_id: {
        type: DataTypes.TEXT,
        references: {
            model: Product,
            key: 'product_url'
        },
        primaryKey: true,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    price_date: {
        type: DataTypes.DATE,
        primaryKey: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'price_history',
    timestamps: false
});

export default PriceHistory;
