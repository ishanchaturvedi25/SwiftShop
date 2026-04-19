const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const validate = require('../middlewares/validate.middleware');
const { createProductSchema } = require('../validators/product.validator');
const upload = require('../config/multer');

router.post('/', 
  authMiddleware, 
  isAdmin, 
  upload.array('images', 5),
  validate(createProductSchema), 
  productController.createProduct
);

router.get('/', productController.getProducts);
router.get('/best-sellers', productController.getBestSellers);
router.get('/:id', productController.getProductById);

module.exports = router;