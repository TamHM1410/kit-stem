const user =require('../models/user-model')
const { BadRequestError } = require('../core/error.response');
const {checkPassword}=require("../utils/index");
const bcrypt = require("bcryptjs");




const changePasswordQuery=async (data)=>{
    const {currentPass,newPassword,user_id}=data 
    const  current_user= await user.findById(user_id)
     
    let  checkPass = await checkPassword(currentPass,current_user.password)
    console.log(checkPass,'checkpass')
    if(!checkPass){
       return  new  BadRequestError('Wrong password')

    }
    const hashPassword = await bcrypt.hashSync(newPassword, 6);


    let newPasswordSet =await user.findByIdAndUpdate(current_user.id,{
        password:hashPassword
    })
    
    return   newPasswordSet




}

module.exports={
    changePasswordQuery
}