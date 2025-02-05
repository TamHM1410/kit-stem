const express=require('express')
const {paths}=require('../config/route')

const methodController=require('../controllers/payment-method-controller')
const paymentMethodRouter=express.Router()

paymentMethodRouter.get(paths.PAYMENTMETHOD.GET,methodController.findAll)

paymentMethodRouter.get(paths.PAYMENTMETHOD.GETBYID,methodController.findById)

paymentMethodRouter.patch(paths.PAYMENTMETHOD.UPDATE,methodController.updateById)

paymentMethodRouter.post(paths.PAYMENTMETHOD.CREATE,methodController.create)

paymentMethodRouter.delete(paths.PAYMENTMETHOD.DELETE,methodController.delete)

module.exports=paymentMethodRouter