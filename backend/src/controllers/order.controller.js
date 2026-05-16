const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    try {
        const result = await orderService.createOrder(req.user.id, req.body.address, req.headers.origin);
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

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders(req.user.id);
        res.json({ orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOrdersForAdmin = async (req, res) => {
    try {
        const orders = await orderService.getOrdersForAdmin();
        res.json({ orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await orderService.updateOrderStatus(orderId, status);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createOrder, verifyPayment, getOrders, getOrdersForAdmin, updateOrderStatus };