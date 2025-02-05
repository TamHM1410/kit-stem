
const asyncHandler=require('express-async-handler')

const {get_cart,update_product_in_cart, update_product_quantity_in_cart}=require('../Repository/cart-repo')

class CartService{
    static find_user_cart=asyncHandler(async(user_id)=>{
        return await get_cart(user_id)

    })
    static update_cart=asyncHandler(async(cart_product,user_id)=>{
        return  await update_product_in_cart(cart_product,user_id)

    })

    static update_cart_quantity=asyncHandler(async({cart_id,stem_id,quantity})=>{
        return await update_product_quantity_in_cart(cart_id,stem_id,quantity)
    })

}

module.exports=CartService