module.exports = (req, res, next) => {
    if (!req.user || req.user.cargo !== 'admin') {
        return res.status(403).json({ error: 'Acesso permitido apenas para administradores.' });
    }
    next();
};