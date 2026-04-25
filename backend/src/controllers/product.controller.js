const productService = require('../services/product.service');
const { uploadImages } = require('../services/cloudinary.service');

const createProduct = async (req, res) => {
    try {
        const files = req.files || [];

        if (files.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        if (files.length > 5) {
        return res.status(400).json({ message: "You can upload up to 5 images per product." });
        }

        const imageUrls = files.length > 0 ? await uploadImages(files) : [];

        const productData = { ...req.body, imageUrls };

        const product = await productService.createProduct(productData);
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

const getBestSellers = async (req, res) => {
    try {
        const products = await productService.getBestSellers();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, getProductById, getBestSellers };