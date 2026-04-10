const Product = require('../models/product.model');

const createProduct = async (data) => {
    return await Product.create(data);
}

const getProducts = async (data) => {
    let { page = 1, limit = 10, search, category } = data;

    page = Number(page);
    limit = Number(limit);
    const filter = {};

    if (search) {
        filter.name = { $regex: search, $option: i };
    }

    if (category) {
        filter.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
                        .skip(skip)
                        .limit(limit)
                        .sort({ createdAt: -1 });

    const total = await Product.coundDocuments(products);

    return {
        products,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

module.exports = { createProduct, getProducts, getProductById };