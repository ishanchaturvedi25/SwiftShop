const mongoose = require('mongoose');

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
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);