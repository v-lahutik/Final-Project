import { NextFunction, Request, Response } from "express";
import Product from "../models/product.model";


// Admin can create new product
export const addNewProduct = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {productName,description,price,stock,image,category} = req.body
        const newProduct = await Product.create({productName,description,price,stock,image,category})
        await newProduct.populate("category")
        res.status(200).json({ msg: "new product added successfully", newProduct });
    } catch (error:any) {
        next(error)
    }
}

// Admin can edit info of existing product
export const editProduct = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const pid = req.params.pid // pid is product ID of mongoDB
        const {productName,description,prise,stock,image,category} = req.body
        const editedProduct = await Product.findByIdAndUpdate(pid, {productName,description,prise,stock,image,category}, { new: true });
        await editedProduct?.populate('category')
        res.status(200).json({ msg: "product edited successfully", editedProduct });
    } catch (error) {
        next(error);
    }
}

// Admin can delete existing product
export const deleteProduct = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const pid = req.params.pid; // pid is product ID of mongoDB
      const deletedProduct = await Product.findByIdAndDelete(pid);
      await deletedProduct?.populate("category")
      if (deletedProduct) {
        res.status(200).json({ msg: "Course deleted successfully",deletedProduct });
      } else {
        return res.status(400).json({ msg: 'There is no such product in our database' });
      }
    } catch (error) {
      next(error);
    }
};

// everyone can see all products in the online shop
export const getAllProducts = async (req: Request,res: Response,next: NextFunction) => {
    try {
      const allProducts = await Product.find({}).populate("category").exec();
      res.status(200).json({ msg: "get all product successfully", allProducts });
    } catch (error: any) {
      next(error);
    }
};

