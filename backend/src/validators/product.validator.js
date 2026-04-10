const { z } = require('zod');

const createProductSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    description: z.string(),
    price: z.number().positive(),
    category: z.string(),
    imageUrl: z.string(),
    stock: z.number().int().nonnegative()
});

module.exports = { createProductSchema };