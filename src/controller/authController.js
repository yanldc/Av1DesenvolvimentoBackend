const authService = require('../service/authService');

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            return res.status(200).json({ message: "Login realizado com sucesso.", token });
        } catch (err) {
            return res.status(err.status || 500).json({ error: err.message });
        }
    }
};