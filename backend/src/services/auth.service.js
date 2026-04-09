const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

const signUp = async (data) => {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken({ id: user._id, role: user.role });

    return { user, token };
};

const login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken({ id: user._id, role: user.role });

    return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

module.exports = { signUp, login };