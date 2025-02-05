const express=require('express')

const StemController=require('../controllers/stem-controller')


const stemRouter=express.Router()


stemRouter.post('/stems',StemController.create_stem)

stemRouter.get('/stems',StemController.find_all_stem)

stemRouter.get('/stems/:id',StemController.findById)


stemRouter.patch('/stems/:id',StemController.update_stem)

stemRouter.delete('/stems/:id',StemController.delete_stem)





module.exports=stemRouter