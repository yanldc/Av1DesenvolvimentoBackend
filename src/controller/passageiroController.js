const { validationResult, matchedData } = require('express-validator');
const passageiroService = require('../service/passageiroService');

module.exports = {
    getPassageiro: async (req, res) => {
        try {
            const passageiro = await passageiroService.getAllPassageiros();
            return res.json({ passageiro });
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    },

    getPassageiroByVoo: async (req, res) => {
        const { vooId } = req.params;
    
        try {
            const passageiros = await passageiroService.getPassageirosPorVooId(vooId);
            return res.status(200).json({ passageiros });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },

    postPassageiro: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        try {
            const newPassageiro = await passageiroService.createPassageiro(data);
            return res.status(201).json({ passageiro: newPassageiro });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },

    editPassageiro: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);
        const passageiroId = req.params.id; 

        try {
            const updatedPassageiro = await passageiroService.editPassageiro(passageiroId, data); 
            return res.status(200).json({ success: true, passageiro: updatedPassageiro });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },

    deletePassageiro: async (req, res) => {
        const passageiroId = req.params.id; 

        try {
            await passageiroService.deletePassageiro(passageiroId); 
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(err.status || 400).json({ error: err.message });
        }
    },
};