import {DataTypes} from "sequelize";
import {sequelize} from "../../kernel/services/db/database.js";

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false
    },
    chat_id: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    username: {
        type: DataTypes.STRING(255),
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
    tableName: 'users',
    timestamps: false
});

export default User;
