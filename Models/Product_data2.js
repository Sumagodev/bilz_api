
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./ProductName');

const ProductData2 = sequelize.define('ProductData2', {
   
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
    tableName: 'Product_Data2',
    });

// Setting up the foreign key
ProductData2.belongsTo(ProductName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ProductName.hasOne(ProductData2, { foreignKey: 'productId' });

module.exports = ProductData2;


