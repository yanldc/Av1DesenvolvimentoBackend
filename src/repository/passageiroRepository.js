const User = require('../model/user');

module.exports = {
    findAllPassageiros: async () => {
        return await Passageiro.find();
    },

    findUserByCpf: async (cpf) => {
        return await Passageiro.findOne({ cpf });
    },

    findById: async (id) => {
        return await Passageiro.findOne({ id });
    },

    updatePassageiroById: async (id, updates) => {
    return await Passageiro.findByIdAndUpdate(id, { $set: updates }, { new: true });
    },

    createPassageiro: async (passageiroData) => {
        const newPassageiro = new Passageiro(passageiroData);
        return await newPassageiro.save();
    }

    
};