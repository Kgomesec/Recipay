const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    console.log("Body recebido:", req.body);
    const { name, cpf, birthDate, email, password } = req.body;

    try {
        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ error: "Email já cadastrado" });

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            cpf,
            birthDate,
            email,
            password: hash
        });

        res.json({ message: "Usuário registrado com sucesso", user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erro no servidor" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Senha incorreta" });

        req.session.userId = user.id;
        req.session.role = user.role;

        res.json({
            message: "Login realizado com sucesso",
            token: "session_active", // só pra não quebrar o app --> token fake
            session: {
                userId: req.session.userId,
                role: req.session.role,
                name: req.session.name
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erro no servidor" });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] }
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Erro no servidor" });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logout realizado" });
    });
});

module.exports = router;