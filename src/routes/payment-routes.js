const express=require('express')
const paymentController=require('../controllers/payment-controller')
const { checkLogin } = require('../middlewares/check-login');

const paymentRouter=express.Router()


paymentRouter.post('/payments/orders',checkLogin,paymentController.createOrder)

paymentRouter.get('/payments/return',checkLogin,paymentController.createOrder)
paymentRouter.post('/payments/callback',paymentController.zalo_call_back)








module.exports=paymentRouter