const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const validate = require('../middlewares/validate.middleware');
const { createProductSchema } = require('../validators/product.validator');

router.post('/', authMiddleware, isAdmin, validate(createProductSchema), productController.createProduct);

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

module.exports = router;