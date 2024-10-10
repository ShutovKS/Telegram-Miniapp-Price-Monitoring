import Product from "./product.js";
import User from "./user.js";
import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const UserProduct = sequelize.define('UserProduct', {
    user_id: {
        type: DataTypes.STRING(255),
        references: {
            model: User,
            key: 'user_id'
        },
        primaryKey: true,
        allowNull: false
    },
    product_id: {
        type: DataTypes.TEXT,
        references: {
            model: Product,
            key: 'product_url'
        },
        primaryKey: true,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    is_notified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'user_products',
    timestamps: false
});

export default UserProduct;
