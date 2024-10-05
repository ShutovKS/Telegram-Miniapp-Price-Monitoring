import Product from "./Product";
import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const PriceHistory = sequelize.define('PriceHistory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    price_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'price_history',
});

module.exports = PriceHistory;
