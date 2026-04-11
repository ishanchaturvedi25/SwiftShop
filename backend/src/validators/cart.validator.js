const { z } = require('zod');
const mongoose = require('mongoose');

const productIdSchema = z.string().refine(
    (val) => mongoose.Types.ObjectId.isValid(val),
    { message: 'Invalid product ID' }
);

const quantitySchema = z.number({
    invalid_type_error: 'Quanitity must be a number'
}).int().positive('Quantity must be greater than 0');

const addToCartSchema = z.object({
    productId: productIdSchema,
    quantity: quantitySchema
});

const updateCartSchema = z.object({
    productId: productIdSchema,
    quantity: quantitySchema
});

const removeFromCartSchema = z.object({
    productId: productIdSchema,
    quantity: quantitySchema
});

module.exports = {
    addToCartSchema,
    updateCartSchema,
    removeFromCartSchema
};