import {sequelize} from "../../kernel/services/db/database.js";
import {DataTypes, UUIDV4} from "sequelize";

const Marketplace = sequelize.define('Marketplace', {
    base_url: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
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
    tableName: 'marketplaces',
    timestamps: false
});

export default Marketplace;
