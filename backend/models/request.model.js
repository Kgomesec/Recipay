const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    materialType: {
        type: DataTypes.ENUM('plastico', 'vidro', 'metal', 'papel'),
        allowNull: false
    },
    quantity: {
        type: DataTypes.ENUM('pequeno', 'medio', 'grande'),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
}, {
    timestamps: true
});

Request.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Request, { foreignKey: 'userId' });

module.exports = Request;
