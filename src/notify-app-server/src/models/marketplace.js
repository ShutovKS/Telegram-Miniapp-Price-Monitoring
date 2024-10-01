import sequelize from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const Marketplace = sequelize.define('Marketplace', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    base_url: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'marketplaces',
});

module.exports = Marketplace;
