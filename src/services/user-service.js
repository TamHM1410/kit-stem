const {getAllUser,updateUserById,findUserById}=require('../Repository/user-repo')
const asyncHandler=require('express-async-handler')
class UserService{
    static findAllUser =asyncHandler(async(limit, skip, sort,query)=>{
        console.log('querry',query)
        return await getAllUser({limit,skip,sort,query})

    })
    static getUserById =asyncHandler(async(id)=>{
        return await findUserById(id)
    })
    
    static updateUser =asyncHandler(async (id,data)=>{
        
        return await updateUserById(id,data)

    })

    // static update_user_id=asyncHandler(async(id,payload)=>{
    //     return await  update
    // })

}

module.exports=UserService