import {DataTypes, UUIDV4} from "sequelize";
import {sequelize} from "../../kernel/services/db/database.js";
import Marketplace from "./marketplace.js";

const Product = sequelize.define('Product', {
    product_url: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false
    },
    marketplace_id: {
        type: DataTypes.STRING(255),
        references: {
            model: Marketplace,
            key: 'base_url'
        },
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    current_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    last_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'products',
    timestamps: false
});

export default Product;
