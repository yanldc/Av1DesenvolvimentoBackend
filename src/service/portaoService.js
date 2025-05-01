const portaoRepository = require('../repository/portaoRepository');

module.exports = {
  getAllportaos: async () => {
    return await portaoRepository.findAllPortaos();
  },

  createPortao: async (data) => {
    const portaoData = {
      codigo: data.codigo,
      disponivel: data.disponivel,
    };

    return await portaoRepository.createPortao(portaoData);
  },

  editportao: async (id, data) => {
    const updates = {};

    if (data.codigo) updates.codigo = data.codigo;
    if (data.status) updates.status = data.status;

    return await portaoRepository.updatePortaoById(id, updates);
  },
};
