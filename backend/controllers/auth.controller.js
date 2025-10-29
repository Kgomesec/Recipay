// lógica de login

const authService = require('src/backend/services/auth.service');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};