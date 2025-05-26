const portaoRepository = require('../repository/portaoRepository');

module.exports = {
  getAllPortaos: async () => {
    try {
      return await portaoRepository.findAllPortaos();
    } catch (err) {
      const error = new Error(err.message);
      error.status = 500;
      throw error;
    }
  },

  createPortao: async (data) => {
    try {
      const portaoData = {
        codigo: data.codigo,
        disponivel: data.disponivel,
      };

      return await portaoRepository.createPortao(portaoData);
    } catch (err) {
      const error = new Error(err.message);
      error.status = 400;
      throw error;
    }
  },

  editPortao: async (id, data) => {
    try {
      const updates = {};

      if (data.codigo) updates.codigo = data.codigo;
      if (data.disponivel !== undefined) updates.disponivel = data.disponivel;

      return await portaoRepository.updatePortaoById(id, updates);
    } catch (err) {
      const error = new Error(err.message);
      error.status = 400;
      throw error;
    }
  },

  deletePortao: async (id) => {
    try {
      return await portaoRepository.deletePortaoById(id);
    } catch (err) {
      const error = new Error(err.message);
      error.status = 400;
      throw error;
    }
  },
};