const express = require('express');
const router = express.Router();
const Request = require('../models/request.model'); 
const User = require('../models/user.model');
const calcRP = require('../utils/calcRP');

router.get('/ranking', async (req, res) => {
    try {
        const requests = await Request.findAll({
            where: { status: "approved" }
        });

        const scores = {};

        for (const req of requests) {
            const points = calcRP(req.materialType, req.quantity);

            if (!scores[req.userId]) {
                scores[req.userId] = 0;
            }

            scores[req.userId] += points;
        }

        const users = await User.findAll();

        const ranking = users.map(u => ({
            userId: u.id,
            name: u.name,
            points: scores[u.id] ?? 0
        }));

        ranking.sort((a, b) => b.points - a.points);

        res.json(ranking);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao gerar ranking" });
    }
});

module.exports = router;