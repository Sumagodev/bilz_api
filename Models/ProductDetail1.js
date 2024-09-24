const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');

const ProductDetail1 = sequelize.define('ProductDetail1', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// Setting up the foreign key
ProductDetail1.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductDetail1, { foreignKey: 'productId' });

module.exports = ProductDetail1;
