import orderModel from "../models/orderModel.js"
import userModel from "../models/userModels.js"
import Stripe from 'stripe'

// global currency
const currency = "inr"
const deliveryCharges = 10

// stripe gatway initalization

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// controller function for placing order with stripe

// controller function for placing order
const placeOrder = async(req, res) => {
        const { userId, items, amount, address } = req.body;
        try {
            const orderData = {
                userId,
                items,
                amount,
                address,
                paymentMethod: 'COD',
                payment: false,
                date: Date.now()
            }
            const newOrder = new orderModel(orderData)
            await newOrder.save()
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Order Placed" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Server Error" })
        }
    }
    // Stripe method
const placeOrderStripe = async(req, res) => {
        try {
            const { userId, items, amount, address } = req.body
            const { origin } = req.headers
            const orderData = {
                userId,
                items,
                amount,
                address,
                paymentMethod: 'Stripe',
                payment: false,
                date: Date.now()
            }
            const newOrder = new orderModel(orderData)
            await newOrder.save()

            const line_items = items.map((item) => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100 * 83
                },
                quantity: item.quantity
            }))
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: "Delivery Charges",
                    },
                    unit_amount: deliveryCharges * 100 * 83
                },
                quantity: 1
            })
            const session = await stripe.checkout.sessions.create({

                mode: 'payment',
                success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items
            })
            res.json({ success: true, session_url: session.url })


        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }
    }
    // geting all order data for admin pannel
const allOrders = async(req, res) => {
        try {
            const orders = await orderModel.find({})
            res.json({ success: true, orders })
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })

        }
    }
    // gettin user order for frontend
const userOrders = async(req, res) => {
        try {
            const { userId } = req.body
            const orders = await orderModel.find({ userId })
            res.json({ success: true, orders })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Server Error" })
        }
    }
    // updating order status
const updateStatus = async(req, res) => {
        try {
            const { orderId, status } = req.body
            await orderModel.findByIdAndUpdate(orderId, { status })
            res.json({ success: true, message: "Status Updated" })
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })

        }
    }
    // verifystripe
const verifyStripe = async(req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error" })
    }
}

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe }