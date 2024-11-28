const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql'); // Your Sequelize instance

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
}, {
    tableName: 'contacts',
    timestamps: false,
});

module.exports = Contact;
