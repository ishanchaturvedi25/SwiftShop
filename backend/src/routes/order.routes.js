const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/create', orderController.createOrder);
router.post('/verify', orderController.verifyPayment);

module.exports = router;