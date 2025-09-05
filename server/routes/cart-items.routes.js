import express from "express";
import { addCartItem, deleteCartItem, getCartItems } from "../controllers/cart-items.controllers.js";
import { authMiddleware } from '../middlewares/auth.middlewares.js';


const cartItemsRoutes=express.Router();

cartItemsRoutes.post("/addcart/:bookId",authMiddleware,addCartItem)
cartItemsRoutes.get("/getcart",authMiddleware,getCartItems)
cartItemsRoutes.get("/deletecart/:cartItemId",authMiddleware,deleteCartItem)

export default cartItemsRoutes;