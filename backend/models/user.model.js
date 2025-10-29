// definição do modelo User

const { DataTypes } = require('sequelize');
const { sequelize } = require('src/backend/config/database')

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'users', //nome da tabela. Trocar quando tiver bd
});

module.exports = User;