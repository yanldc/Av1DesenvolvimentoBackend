const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const funcionarioRepository = require('../repository/funcionarioRepository');

module.exports = {
      createFuncionario: async (data) => {
        const emailExists = await funcionarioRepository.findFuncionarioByEmail(data.email);
        if (emailExists) throw new Error('Email já cadastrado');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const funcionarioData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            cargo: data.cargo,
        };

        return await funcionarioRepository.createFuncionario(funcionarioData);
    },
    
};