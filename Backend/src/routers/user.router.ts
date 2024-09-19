import express from "express";
import { login, logout, register, verifyAccount } from "../controllers/user.controller";
import { loginValidation, registerValidation } from "../validators/user.validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { bookingCourse, cancelBooking } from "../controllers/booking.controller";
import { authenticateAndCheckRoles } from "../middlewares/authAndRoles";

const userRouter =express.Router();

userRouter.post('/register',registerValidation, validateRequest, register)
userRouter.get('/verify/:verifyToken/:uid', verifyAccount)
userRouter.post('/login',loginValidation, validateRequest, login)
userRouter.post('/logout', logout)

userRouter.put('/booking/:cid',authenticateAndCheckRoles('member'),bookingCourse)
userRouter.put('/cancelBooking/:cid',authenticateAndCheckRoles('member'),cancelBooking)

export default userRouter;