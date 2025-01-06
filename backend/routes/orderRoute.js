import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allOrder, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// for admin
orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status', adminAuth, updateStatus)

// for payment
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

// verify payment
orderRouter.post('/verify', authUser, verifyStripe)

// For user
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter