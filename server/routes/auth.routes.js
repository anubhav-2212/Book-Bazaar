import express from "express"
import { generateApiKey, getMe, login, register } from "../controllers/auth.controllers.js";


const authRoutes=express.Router();

authRoutes.post("/register",register)
authRoutes.post("/login",login)
authRoutes.post("/api-key",generateApiKey)
authRoutes.post("/getme",getMe)




export default authRoutes;