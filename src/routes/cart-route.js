const CartController=require('../controllers/cart-controller')
const express =require('express')
const { checkLogin } = require('../middlewares/check-login');


const cartRouter=express.Router()

cartRouter.get('/carts',checkLogin,CartController.findCart)

cartRouter.patch('/carts',checkLogin,CartController.updatedCart)



module.exports=cartRouter

