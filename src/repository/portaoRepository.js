const Portao = require('../model/portao');

module.exports = {
  findAllPortaos: async () => {
    return await Portao.find();
  },

  findById: async (id) => {
    return await Portao.findById(id);
  },

  createPortao: async (data) => {
    const novo = new Portao(data);
    return await novo.save();
  },

  updatePortaoById: async (id, updates) => {
    return await Portao.findByIdAndUpdate(id, { $set: updates }, { new: true });
  },

  setDisponibilidade: async (portaoId, disponivel) => {
    return await Portao.findByIdAndUpdate(portaoId, { $set: { disponivel } }, { new: true });
  },

  deletePortaoById: async (id) => {
    return await Portao.findByIdAndDelete(id);
  }
};
