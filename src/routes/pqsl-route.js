const express=require('express')
const {client,psqlConnection}=require('../config/psqlconnection')
const psqlRoute=express.Router()
const PsqlController=require('../controllers/psql-controller')




psqlRoute.get('/psql',async(req,res)=>{
    await psqlConnection()
    const result= await client.query('Select*from users')
    return res.json(result?.rows)
}


)

psqlRoute.post('/psql',PsqlController.getListMsg)

psqlRoute.post('/psql/create',PsqlController.createGroupChat)

psqlRoute.post('/psql/msg',PsqlController.createMsg)


psqlRoute.post('/psql/msg/list',PsqlController.getMsgByUserId)

psqlRoute.post('/psql/msg/detail',PsqlController.getDetailMsg)








module.exports=psqlRoute
