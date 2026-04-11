const crypto = require('crypto');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const razorpay = require('../utils/razorpay');

const createOrder = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0)
        throw new Error('Cart is empty');

    const totalAmount = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: 'INR'
    });

    const order = await Order.create({
        user: userId,
        items: cart.items,
        totalAmount,
        status: 'pending',
        razorpayOrderId: razorpayOrder.id
    });

    return { order, razorpayOrder };
};

const verifyPayment = async (data) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                .update(body)
                                .digest('hex');

    if (expectedSignature !== razorpay_signature)
        throw new Error('payment verification failed');

    const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'paid' },
        { new: true }
    );

    await Cart.findOneAndUpdate(
        { user: order.user },
        { items: [] }
    );

    return order;
}

module.exports = { createOrder, verifyPayment };