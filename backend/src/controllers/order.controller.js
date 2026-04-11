const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.user.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const order = await orderService.verifyPayment(req.body);
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createOrder, verifyPayment };