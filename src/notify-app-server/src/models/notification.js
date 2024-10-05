import Product from "./product.js";
import User from "./user.js";
import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const Notification = sequelize.define('Notification', {
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
    notification_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'notifications',
});

export default Notification;
