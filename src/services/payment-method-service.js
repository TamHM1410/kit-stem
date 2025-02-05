const {findAllPaymentMethod, 
    findPaymentMethodById,
    createNewPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod}=require('../Repository/payment-method-repo')
const asyncHandler=require('express-async-handler')
class PaymentMethodService{
    static findALl=asyncHandler(async()=>{
        return await findAllPaymentMethod()
    })
    static findById=asyncHandler(async(id)=>{
        return await findPaymentMethodById(id)
    })
    static createNew=asyncHandler(async(data)=>{
        return await createNewPaymentMethod(data)

    })
    static update=asyncHandler(async(data,id)=>{
        return await updatePaymentMethod(data,id)
    })
    static delete=asyncHandler(async(id)=>{
        return await deletePaymentMethod(id)
    })

}
module.exports=PaymentMethodService