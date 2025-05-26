const { validationResult, matchedData } = require('express-validator');
const portaoService = require('../service/portaoService');

module.exports = {
  getPortao: async (req, res) => {
    try {
      const portao = await portaoService.getAllPortaos();
      return res.json({ portao });
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  },

  postPortao: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() });
    }

    const data = matchedData(req);

    try {
      const newPortao = await portaoService.createPortao(data);
      return res.status(201).json({ portao: newPortao });
    } catch (err) {
      return res.status(err.status || 400).json({ error: err.message });
    }
  },

  editPortao: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() });
    }

    const data = matchedData(req);
    const portaoId = req.params.id;

    try {
      const updatedPortao = await portaoService.editPortao(portaoId, data);
      return res.status(200).json({ success: true, portao: updatedPortao });
    } catch (err) {
      return res.status(err.status || 400).json({ error: err.message });
    }
  },

  deletePortao: async (req, res) => {
    const portaoId = req.params.id;

    try {
      await portaoService.deletePortao(portaoId);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(err.status || 400).json({ error: err.message });
    }
  },
};