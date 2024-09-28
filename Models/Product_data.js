
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');

const ProductData = sequelize.define('ProductData', {
   
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
    tableName: 'Product_Data',
    });

// Setting up the foreign key
ProductData.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductData, { foreignKey: 'productId' });

module.exports = ProductData;


