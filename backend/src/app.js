const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === "INVALID_FILE_TYPE") {
    return res
      .status(400)
      .json({ message: "Only JPEG, PNG, and WEBP images are allowed." });
  }
  res.status(500).json({ message: "Internal Server Error" });
});

app.get('/', (req, res) => {
  res.send('Welcome to SwiftShop API!');
});

module.exports = app;