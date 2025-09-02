import express from "express";

import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { addOrder, getOrdersById, getUserOrder } from "../controllers/order.controller.js";

const orderRoutes=express.Router();

orderRoutes.post("/order",authMiddleware,addOrder)
orderRoutes.get("/orders/:id",authMiddleware,getOrdersById)
orderRoutes.get("/order",authMiddleware,getUserOrder)

export default orderRoutes  