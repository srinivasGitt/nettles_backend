const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Opportunity = sequelize.define('Opportunity', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: DataTypes.STRING,
    projectId: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    projectScope: DataTypes.STRING,
}, {
    tableName: 'opportunities',
    timestamps: false,
});

module.exports = Opportunity;
