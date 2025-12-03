const Request = require('../models/request.model');

exports.createRequest = async (req, res) => {
    try {
        const { materialType, quantity, address } = req.body;

        if (!materialType || !quantity || !address) {
            return res.status(400).json({ error: "Campos faltando" });
        }

        const newRequest = await Request.create({
            userId: req.session.userId,
            materialType,
            quantity,
            address,
            status: "pending"
        });

        res.json({
            message: "Solicitação criada",
            request: newRequest
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao criar solicitação" });
    }
};
