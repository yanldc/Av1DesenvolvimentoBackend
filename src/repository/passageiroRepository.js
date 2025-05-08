const mongoose = require('mongoose');
const Passageiro = require('../model/passageiro');

module.exports = {
  findAllPassageiros: async () => {
    return await Passageiro.find();
  },

  findAllPassageirosByVoo: async (vooId) => {
    return await Passageiro.find({
      vooId: new mongoose.Types.ObjectId(vooId)
    });
  },

  findPassageiroByCpf: async (cpf) => {
    return await Passageiro.findOne({ cpf });
  },

  findById: async (id) => {
    return await Passageiro.findById(id);
  },

  updatePassageiroById: async (id, updates) => {
    return await Passageiro.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );
  },

  createPassageiro: async (passageiroData) => {
    const newPassageiro = new Passageiro(passageiroData);
    return await newPassageiro.save();
  },

  updateCheckInStatusByVooId: async (vooId, statusVoo) => {
    const novoStatusCheckIn =
      statusVoo === 'embarque' ? 'liberado' : 'bloqueado';

    await Passageiro.updateMany(
      { vooId: new mongoose.Types.ObjectId(vooId) },
      { $set: { statusCheckIn: novoStatusCheckIn } }
    );
  },

  deletePassageiroById: async (id) => {
    return await Passageiro.findByIdAndDelete(id);
  },

  findPassageirosByVooId: async (vooId) => {
    return await Passageiro.find({
      vooId: new mongoose.Types.ObjectId(vooId)
    });
  }
};
