const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ServiceName = require('./servicename');

const ServiceDetail = sequelize.define('ServiceDetail', {
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: ServiceName,
            key: 'id'
        },
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'service_details',
});

// Foreign Key Relationship
ServiceDetail.belongsTo(ServiceName, { foreignKey: 'productId', onDelete: 'CASCADE' });
ServiceName.hasMany(ServiceDetail, { foreignKey: 'productId' });

module.exports = ServiceDetail;
