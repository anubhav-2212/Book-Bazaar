import express from "express"
import { generateApiKey, getMe, login, register } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";


const authRoutes=express.Router();

authRoutes.post("/register",register)
authRoutes.post("/login",login)
authRoutes.post("/api-key",authMiddleware,generateApiKey)
authRoutes.get("/getme",authMiddleware,getMe)




export default authRoutes;