const Product = require('../models/product.model');

const createProduct = async (data) => {
    return await Product.create(data);
}

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
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

    const total = await Product.countDocuments(products);

    const result = {
        products,
        total,
        page,
        pages: Math.ceil(total / limit)
    };

    return result;
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const getBestSellers = async (data) => {
    let { page = 1, limit = 10, search, category } = data;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const products = await Product.find({ bestSeller: true })
                        .skip(skip)
                        .limit(limit)
                        .sort({ createdAt: -1 });

    const total = await Product.countDocuments(products);

    const result = {
        products,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
    
    return result;
};

module.exports = { createProduct, deleteProduct, getProducts, getProductById, getBestSellers };