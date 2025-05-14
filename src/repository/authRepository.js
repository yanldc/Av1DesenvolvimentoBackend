const Funcionario = require('../model/funcionario');

module.exports = {
    findByEmail: async (email) => {
        return await Funcionario.findOne({ email });
    }
};