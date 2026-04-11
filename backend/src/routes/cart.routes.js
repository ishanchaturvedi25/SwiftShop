const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { addToCartSchema, updateCartSchema, removeFromCartSchema } = require('../validators/cart.validator');

router.use(authMiddleware);

router.get('/', cartController.getCart);
router.get('/add', validate(addToCartSchema), cartController.addToCart);
router.get('/update', validate(updateCartSchema), cartController.updateCartItem);
router.get('/remove', validate(removeFromCartSchema), cartController.removeFromCart);

module.exports = router;