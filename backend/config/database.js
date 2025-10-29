// conexão com o PostgreSQL via Sequelize

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Importante: setar como true para debugar as queries SQL
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com PostgreSQL bem-sucedida!');
    } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };