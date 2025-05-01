const Voo = require('../model/voo');
const portaoRepository = require('./portaoRepository');

module.exports = {
  findAllVoos: async () => {
    return await Voo.find();
  },

  findById: async (id) => {
    return await Voo.findById(id);
  },

  createVoo: async (vooData) => {
    const portao = await portaoRepository.findById(vooData.portaoId);
    if (!portao) throw new Error('Portão não encontrado.');
    if (!portao.disponivel) throw new Error('Portão não está disponível.');

    const existingVoo = await Voo.findOne({ portaoId: vooData.portaoId });
    if (existingVoo) throw new Error('Este portão já está vinculado a outro voo.');

    const newVoo = new Voo(vooData);
    const saved = await newVoo.save();

    await portaoRepository.setDisponibilidade(vooData.portaoId, false);

    return saved;
  },

  updateVooById: async (id, updates) => {
    if (updates.portaoId) {
      const portao = await portaoRepository.findById(updates.portaoId);
      if (!portao || !portao.disponivel) {
        throw new Error('Novo portão não está disponível.');
      }
    }

    return await Voo.findByIdAndUpdate(id, { $set: updates }, { new: true });
  }
};
