const crypto = require('crypto');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const razorpay = require('../utils/razorpay');
const stripe = require('../utils/stripe');

const createOrder = async (userId, address, origin) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0)
        throw new Error('Cart is empty');

    const totalPrice = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    const orderItems = cart.items.map((item) => ({
        product: item.product._id || item.product,
        size: item.size,
        quantity: item.quantity,
    }));

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalPrice,
        status: 'pending',
        address
    });

    let paymentInfo;

    if (address.paymentMethod === 'razorpay') {
        const razorpayOrder = await razorpay.orders.create({
            amount: totalPrice * 100,
            currency: 'INR'
        });
        paymentInfo = razorpayOrder;
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();
    } else if (address.paymentMethod === 'stripe') {
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `{origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `{origin}/verify?success=false&orderId=${order._id}`,
            mode: 'payment'
        });
        paymentInfo = stripeSession;
    } else {
        await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    }

    return { order, paymentInfo };
};

const getOrders = async (userId) => {
    return await Order.find({ user: userId })
        .populate('items.product')
        .sort({ createdAt: -1 });
};

const verifyPayment = async (data) => {
    const { paymentMethod } = data;
    
    switch (paymentMethod) {
        case 'razorpay':
            return verifyRazorpayPayment(data);
        case 'stripe':
            return verifyStripePayment(data);
    }
}

const verifyRazorpayPayment = async (data) => {
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
};

const verifyStripePayment = async (data) => {
    const { orderId, success } = data;
    
    if (success === 'true') {
        const order = await Order.findByIdAndUpdate(orderId, { status: 'paid' });
        await Cart.findOneAndUpdate(
            { user: order.user },
            { items: [] }
        );
        return order;
    } else {
        throw new Error('payment verification failed');
    }
};

const getOrdersForAdmin = async () => {
    return await Order.find()
        .populate('user', 'name email')
        .populate('items.product')
        .sort({ createdAt: -1 });
}

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);

    if (!order)
        throw new Error('Order not found');
    order.status = status;
    await order.save();
    return order;
}

module.exports = { createOrder, verifyPayment, getOrders, getOrdersForAdmin, updateOrderStatus };