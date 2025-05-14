const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');
const authRepository = require('../repository/authRepository');

module.exports = {
    login: async (email, password) => {
        if (!email || !password) {
            const error = new Error("Email e senha são obrigatórios.");
            error.status = 400;
            throw error;
        }

        const funcionario = await authRepository.findByEmail(email);
        if (!funcionario) {
            const error = new Error("Email ou senha incorretos.");
            error.status = 401;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, funcionario.password);
        if (!isMatch) {
            const error = new Error("Email ou senha incorretos.");
            error.status = 401;
            throw error;
        }

        const payload = {
            id: funcionario._id.toString(), 
            nome: funcionario.name,
            cargo: funcionario.cargo
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return {
            token,
            funcionario: payload 
        };
    }
};
