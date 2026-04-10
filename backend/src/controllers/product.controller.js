const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, getProductById };