import express from 'express'
import { registerValidation } from '../validators/user.validator'
import { deleteUser, register, updateUser } from '../controllers/admin.controller'
import { authenticateAndCheckRoles } from '../middlewares/authAndRoles'


const adminRouter=express.Router()

adminRouter.post('/register', registerValidation, authenticateAndCheckRoles('admin'), register)
adminRouter.put('/update/:uid', authenticateAndCheckRoles('admin'), updateUser)
adminRouter.delete('/delete/:uid', authenticateAndCheckRoles('admin'), deleteUser)


export default adminRouter