const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string(),

  price: z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);

    if (isNaN(parsed) || parsed < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Price must be a non-negative number',
      });
      return z.NEVER;
    }

    return parsed;
  }),

  category: z.string(),

  stock: z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);

    if (isNaN(parsed) || parsed < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Stock must be a non-negative number',
      });
      return z.NEVER;
    }

    return parsed;
  }),
});

module.exports = { createProductSchema };