import Product from "./product.js";
import User from "./user.js";
import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const UserProduct = sequelize.define('UserProduct', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    product_id: {
        type: DataTypes.UUID,
        references: {
            model: Product,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    is_notified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'user_products',
});

export default UserProduct;
