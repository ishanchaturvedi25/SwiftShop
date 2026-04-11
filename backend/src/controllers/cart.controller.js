const cartService = require('../services/cart.service');

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addToCart(req.user.id, productId, quantity);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.updateCartItem(req.user.id, productId, quantity);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await cartService.removeFromCart(req.user.id, productId);
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};