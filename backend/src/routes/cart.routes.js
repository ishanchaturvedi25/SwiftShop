const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { addToCartSchema, updateCartSchema, removeFromCartSchema } = require('../validators/cart.validator');

router.use(authMiddleware);

router.get('/', cartController.getCart);
router.post('/add', validate(addToCartSchema), cartController.addToCart);
router.put('/update', validate(updateCartSchema), cartController.updateCartItem);
router.delete('/remove', validate(removeFromCartSchema), cartController.removeFromCart);

module.exports = router;