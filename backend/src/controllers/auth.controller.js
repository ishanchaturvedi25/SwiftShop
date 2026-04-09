const authService = require('../services/auth.service');

const signup = async (req, res) => {
    try {
        const { user, token } = await authService.signUp(req.body);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = await authService.login(req.body);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signup, login };