const Product = require('../models/product.model');
const { client } = require('../config/redis');

const createProduct = async (data) => {
    await client.del("products:*");
    return await Product.create(data);
}

const deleteProduct = async (id) => {
    await client.del(`product:${id}`);
    return await Product.findByIdAndDelete(id);
}

const getProducts = async (data) => {
    let { page = 1, limit = 10, search, category } = data;

    page = Number(page);
    limit = Number(limit);

    const cacheKey = `products:${page}:${limit}:${search || ''}:${category || ''}`;

    const cachedData = await client.get(cacheKey);
    if (cachedData) {
        console.log('Serving from Redis');
        return JSON.parse(cachedData);
    }

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

    await client.set(cacheKey, 60, JSON.stringify(result));

    return result;
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const getBestSellers = async () => {
    let { page = 1, limit = 10, search, category } = data;

    page = Number(page);
    limit = Number(limit);

    const cacheKey = `bestSellers:${page}:${limit}`;
    
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
        console.log('Serving best sellers from Redis');
        return JSON.parse(cachedData);
    }

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

    await client.set(cacheKey, 60, JSON.stringify(products));
    
    return products;
};

module.exports = { createProduct, deleteProduct, getProducts, getProductById, getBestSellers };