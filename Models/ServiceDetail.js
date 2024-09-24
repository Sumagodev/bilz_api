// // models/ProductImages.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const ProductImages = sequelize.define('ProductImages', {
//   img: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   ProductDetailId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'ProductDetails',
//       key: 'id'
//     }
//   },
//   productName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// }, {
//   timestamps: true,
// });

// module.exports = ProductImages;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductName = require('./servicename');

const ProductImage = sequelize.define('service_detail', {
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
