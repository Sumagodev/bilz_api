// models/ProductImages.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ServiceName = require('./servicename'); // Adjust the import to your project structure

const ProductImages1 = sequelize.define('ProductImages', {
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductDetailId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ServiceName, // This should match the Sequelize model you're referencing
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = ProductImages1;

// Ensure associations are set up
ServiceName.hasMany(ProductImages1, { foreignKey: 'ProductDetailId' });
// ProductImages1.belongsTo(ServiceName, { foreignKey: 'ProductDetailId' });
