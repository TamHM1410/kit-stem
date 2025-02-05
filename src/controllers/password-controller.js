const passwordService= require('../services/password-service')
const asyncHandler=require('express-async-handler')
const { SuccessResponse ,Success} = require("../core/success.response");

class PasswordController {
    static updatePassword= asyncHandler(async(req,res)=>{
        let data=req.body
        console.log(data)
         new Success('Success',await passwordService.changePassword(data)).send(res)
        

    })

}

module.exports=PasswordController