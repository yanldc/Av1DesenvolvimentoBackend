const { validationResult, matchedData } = require('express-validator');
const vooService = require('../service/vooService');

module.exports = {
    getVoo: async (req, res) => {
        try {
            const voo = await vooService.getAllVoos();
            return res.json({ voo });
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    },

    postVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        try {
            const newVoo = await vooService.createVoo(data);
            return res.status(201).json({ voo: newVoo });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },

    editVoo: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);
        const vooId = req.params.id;

        try {
            const updatedVoo = await vooService.editVoo(vooId, data);
            return res.status(200).json({ success: true, voo: updatedVoo });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },

    deleteVoo: async (req, res) => {
        const vooId = req.params.id; 

        try {
            await vooService.deleteVoo(vooId); 
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },
};