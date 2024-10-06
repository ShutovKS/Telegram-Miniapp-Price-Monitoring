import Product from "./product.js";
import User from "./user.js";
import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING(255),
        references: {
            model: User,
            key: 'user_id'
        },
        allowNull: false
    },
    product_id: {
        type: DataTypes.TEXT,
        references: {
            model: Product,
            key: 'product_url'
        },
        allowNull: false
    },
    notification_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'notifications',
    timestamps: false
});

export default Notification;
