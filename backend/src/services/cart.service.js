const Cart = require("../models/cart.model");

const getCart = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.product");
};

const addToCart = async (userId, productId, size, quantity) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, size, quantity }],
    });
    return cart;
  }

  const itemIdx = cart.items.findIndex(
    (item) => item.product.toString() === productId && item.size === size,
  );

  if (itemIdx > -1) {
    cart.items[itemIdx].quantity += quantity;
  } else {
    cart.items.push({ product: productId, size, quantity });
  }

  await cart.save();
  return cart;
};

const updateCartItem = async (userId, productId, size, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (item) => item.product.toString() === productId && item.size === size,
  );

  if (!item) throw new Error("Item not in cart");

  item.quantity = quantity;

  await cart.save();
  return cart;
};

const removeFromCart = async (userId, productId, size) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => !(item.product.toString() === productId && item.size === size),
  );

  await cart.save();
  return cart;
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
