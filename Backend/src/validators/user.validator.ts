import { body, ValidationChain } from "express-validator";  
import User from "../models/user.model"; 
import { createError } from "../utils/helper"; 

async function isDuplicate(email: string): Promise<void> {
  const user = await User.findOne({ email });
  if (user) {
    throw createError("This email is already in use!", 401);
  }
}

export const registerValidation: ValidationChain[] = [
  body("firstName")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name must contain only letters")
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be between 3 and 50 characters"),
  body("lastName")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name must contain only letters")
    .isLength({ min: 3, max: 100 })
    .withMessage("Last name must be between 3 and 100 characters"),
  body("email")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(isDuplicate), 
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
];


export const loginValidation: ValidationChain[] = [
  body("email")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("loginPassword")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
];

export const resetPasswordValidation: ValidationChain[] = [
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
];

export const changePasswordValidation: ValidationChain[] = [
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),
  
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 5 })
    .withMessage("New password must be at least 5 characters long")
    .matches(/\d/)
    .withMessage("New password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("New password must contain at least one special character"),
    
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your new password")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];