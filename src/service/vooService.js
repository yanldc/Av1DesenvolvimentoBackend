const vooRepository = require('../repository/vooRepository');
const passageiroRepository = require('../repository/passageiroRepository');
const portaoRepository = require('../repository/portaoRepository');

module.exports = {
  getAllVoos: async () => {
    return await vooRepository.findAllVoos();
  },

  createVoo: async (data) => {
    const vooData = {
      numeroVoo: data.numeroVoo,
      origem: data.origem,
      destino: data.destino,
      dataHoraPartida: data.dataHoraPartida,
      portaoId: data.portaoId,
      status: data.status
    };

    return await vooRepository.createVoo(vooData);
  },

  editVoo: async (id, data) => {
    const updates = {};
    let atualizarStatusPassageiros = false;

    if (data.status) {
      updates.status = data.status;
      atualizarStatusPassageiros = true;
    }
    if (data.numeroVoo) updates.numeroVoo = data.numeroVoo;
    if (data.origem) updates.origem = data.origem;
    if (data.destino) updates.destino = data.destino;
    if (data.dataHoraPartida) updates.dataHoraPartida = data.dataHoraPartida;
    if (data.portaoId) updates.portaoId = data.portaoId;

    const vooAtualizado = await vooRepository.updateVooById(id, updates);

    if (atualizarStatusPassageiros) {
      await passageiroRepository.updateCheckInStatusByVooId(id, data.status);

      if (data.status === 'concluido') {
        const voo = await vooRepository.findById(id);
        await portaoRepository.setDisponibilidade(voo.portaoId, true);
      }
    }

    return vooAtualizado;
  },

  deleteVoo: async (id) => {
      return await vooRepository.deleteVooById(id);
    },
};
