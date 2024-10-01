import {DataTypes, UUIDV4} from "sequelize";
import sequelize from "../../kernel/services/db/database.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    telegram_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
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
    tableName: 'users',
});

module.exports = User;
