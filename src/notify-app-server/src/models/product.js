import {DataTypes, UUIDV4} from "sequelize";
import sequelize from "../../kernel/services/db/database.js";
import Marketplace from "./Marketplace";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    marketplace_id: {
        type: DataTypes.UUID,
        references: {
            model: Marketplace,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    current_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    last_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    min_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    max_price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'products',
});

module.exports = Product;
