require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'sua_chave_secreta_fallback',
};