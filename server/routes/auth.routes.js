import express from "express"
import { generateApiKey, getMe, login, register } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";


const authRoutes=express.Router();

authRoutes.post("/register",register)
authRoutes.post("/login",authMiddleware,login)
authRoutes.post("/api-key",authMiddleware,generateApiKey)
authRoutes.post("/getme",authMiddleware,getMe)




export default authRoutes;