const { z } = require("zod");

const sizeEnum = ["XS", "S", "M", "L", "XL", "XXL"];

const createProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string(),

  price: z.string().transform((val, ctx) => {
    const parsed = parseInt(val, 10);

    if (isNaN(parsed) || parsed < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Price must be a non-negative number",
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
        message: "Stock must be a non-negative number",
      });
      return z.NEVER;
    }

    return parsed;
  }),

  sizes: z.preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return val;
        }
      }
      return val;
    },
    z.array(z.enum(sizeEnum)),
  ),

  bestSeller: z.string().transform((val) => val === "true"),
});

module.exports = { createProductSchema };
