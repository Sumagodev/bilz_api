const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product_category = sequelize.define("product_category", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
 
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product_category;
