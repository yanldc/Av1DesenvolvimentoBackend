const Funcionario = require('../model/funcionario');

module.exports = {
      findFuncionarioByEmail: async (email) => {
        return await Funcionario.findOne({ email });
    },

    createFuncionario: async (funcionarioData) => {
        const newFuncionario = new Funcionario(funcionarioData);
        return await newFuncionario.save();
    }
};