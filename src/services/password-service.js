const { BadRequestError } = require('../core/error.response');
const { SuccessResponse, Success } = require('../core/success.response');

const user=require('../models/user-model')

const {changePasswordQuery}=require('../Repository/password-repo')
const asyncHandler = require("express-async-handler");


class PasswordService{
    static changePassword=asyncHandler(async(data)=>{
        console.log('data',data)
    return changePasswordQuery(data)

    


        

    })
   




}

module.exports=PasswordService