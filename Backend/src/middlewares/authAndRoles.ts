import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { createError } from "../utils/helper";
import { verifyToken } from "../utils/jwt";
import { UserRole } from "../models/user.model";

export const authenticateAndCheckRoles = (roles: UserRole[]) => {
  return async (req: Request & { payload?: any },res: Response,next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(400).json({
          status: "failure",
          msg: "Cookie does not exist or cookie expired",
        });
      }
      // Verify jwtToken to check the user logged in or not 
      const token_payload = await verifyToken(token,process.env.JWT_SECRET as string);
      const user = await User.findById(token_payload.id);
      if (!user) {
       return res.status(404).json({
        status: "failure",
        msg: "User not found or already deleted."
      });
      }
      // To check the role
      if (!roles.includes(user.role as UserRole)) {
        return res.status(401).json({
          status: "failure",
          msg: "You are not authorized to perform this operation"
        });
      }
      req.payload = token_payload
      next();
    } catch (error) {
      next(error);
    }
  };
};