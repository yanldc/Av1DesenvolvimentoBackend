const portaoRepository = require('../repository/portaoRepository');

module.exports = {
  getAllPortaos: async () => {
    return await portaoRepository.findAllPortaos();
  },

  createPortao: async (data) => {
    const portaoData = {
      codigo: data.codigo,
      disponivel: data.disponivel,
    };

    return await portaoRepository.createPortao(portaoData);
  },

 editPortao: async (id, data) => {
    const updates = {};

    if (data.codigo) updates.codigo = data.codigo;
    if (data.status) updates.status = data.status;
    if (data.disponivel !== undefined) updates.disponivel = data.disponivel; // Atualiza disponivel, se passado

    return await portaoRepository.updatePortaoById(id, updates);
  },

  deletePortao: async (id) => {
    return await portaoRepository.deletePortaoById(id);
  },
};
