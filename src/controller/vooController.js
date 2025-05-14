const { validationResult, matchedData } = require('express-validator');
const vooService = require('../service/vooService');

module.exports = {
    getVoo: async (req, res) => {
        const voo = await vooService.getAllVoos();
        return res.json({ voo });
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
            return res.status(400).json({ error: err.message });
        }
    },

    editVoo: async (req, res) => {
        if (!req.funcionario || req.funcionario.cargo !== 'admin') {
            return res.status(403).json({ error: 'Apenas administradores podem editar voos.' });
        }
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }
    
        const data = matchedData(req);
        const vooId = req.params.id;
    
        try {
            await vooService.editVoo(vooId, data);
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    deleteVoo: async (req, res) => {
        const vooId = req.params.id; 

        try {
            await vooService.deleteVoo(vooId); 
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(400).json({ error: err.message });
    }
    },
};