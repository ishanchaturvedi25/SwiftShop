const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');

router.use(authMiddleware);

router.get('/', orderController.getOrders);
router.post('/create', orderController.createOrder);
router.post('/verify', orderController.verifyPayment);

// for admin
router.get('/admin', isAdmin, orderController.getOrdersForAdmin);
router.post('/status', isAdmin, orderController.updateOrderStatus);

module.exports = router;