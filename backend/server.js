require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'chaveUltraSecretaTrocaDepois',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));

app.use('/auth', require('./routes/auth.routes'));

sequelize.sync().then(() => {
    console.log("Banco sincronizado");

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});