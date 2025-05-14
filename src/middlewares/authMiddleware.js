const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido ou expirado." });
        }

        req.funcionario = {
            id: decoded.id,
            nome: decoded.nome,
            cargo: decoded.cargo
        };

        next();
    });
};
