import express from "express";

import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { addOrder, getOrdersById, getUserOrder } from "../controllers/order.controller.js";

const orderRoutes=express.Router();

orderRoutes.post("/addorder",authMiddleware,addOrder)
orderRoutes.get("/order/:bookId",authMiddleware,getOrdersById)
orderRoutes.get("/allorders",authMiddleware,getUserOrder)

export default orderRoutes  