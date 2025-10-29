// define a rota /login

const express = require('express');
const router = express.Router();
const authController = require('src/backend/controllers/auth.controller');

router.post('/login', authController.login);

module.exports = router;