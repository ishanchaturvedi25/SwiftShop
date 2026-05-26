const mongoose = require('mongoose');

const sizeEnum = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const productSchema = new mongoose.Schema({
    name: 'String',
    description: 'String',
    price: 'Number',
    category: 'String',
    imageUrls: ['String'],
    stock: 'Number',
    bestSeller: {
        type: Boolean,
        default: false
    },
    sizes: {
        type: [String],
        default: [],
        enum: sizeEnum
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);