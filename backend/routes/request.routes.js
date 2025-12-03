const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requestController = require("../controllers/request.controller");
const Request = require('../models/request.model');


router.post("/new", auth, requestController.createRequest);

// PEGAR TODAS AS SOLICITAÇÕES DE UM USUÁRIO
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const requests = await Request.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({ requests });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao buscar solicitações" });
    }
});

module.exports = router;
