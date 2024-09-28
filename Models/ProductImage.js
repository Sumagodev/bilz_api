
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');

const ProductImage = sequelize.define('ProductImage', {
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
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductName,
            key: 'id'
        },
        allowNull: false,
    },
    }, {
    timestamps: true,
    tableName: 'Product_Image2',
    });

// Setting up the foreign key
ProductImage.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductImage, { foreignKey: 'productId' });

module.exports = ProductImage;


