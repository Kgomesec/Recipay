const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.registerUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.loginUser(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
