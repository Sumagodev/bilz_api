
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');

const ProductImage = sequelize.define('product_image', {
    img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Setting up the foreign key
ProductImage.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductImage, { foreignKey: 'productId' });

module.exports = ProductImage;
