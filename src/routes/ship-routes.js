const express=require('express')

const shipRouter=express.Router()

const ship_controller=require('../controllers/shipping-controller')

const { checkLogin } = require('../middlewares/check-login');


shipRouter.get('/ships/users',checkLogin ,ship_controller.shipper_get_list_work)


shipRouter.patch('/ships/:id',checkLogin ,ship_controller.update_shipping_status)




module.exports=shipRouter