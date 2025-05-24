const { validationResult, matchedData } = require('express-validator');
const funcionarioService = require('../service/funcionarioService');

module.exports = {
    postFuncionario: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        try {
            const newFuncionario = await funcionarioService.createFuncionario(data);
            return res.status(201).json({ funcionario: newFuncionario });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

};