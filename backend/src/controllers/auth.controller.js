const authService = require('../services/auth.service');

const signup = async (req, res) => {
    try {
        const { user, token } = await authService.signUp(req.body);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = await authService.login(req.body, 'user');
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { user, token } = await authService.login(req.body, 'admin');
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const verify = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
};

module.exports = { signup, login, adminLogin, verify, logout };