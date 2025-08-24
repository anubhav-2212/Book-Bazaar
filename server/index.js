import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
import cookieParser from "cookie-parser";
import booksRoutes from "./routes/books.routes.js";

const app=express();
const port=process.env.PORT||8000

app.use(express.json());
app.use(cors({
    // origin: "http://localhost:3000", // ✅ Allowed origin(s)
    origin:"*",
  methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed request headers
  exposedHeaders: ["Content-Length", "X-Custom-Header"], // ✅ Headers exposed to browser
  credentials: true,
}))

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


// app.get("/",(req,res)=>{
//     res.send("Hi")
// })
db();
app.use('/api/v1/user/auth',authRoutes)
app.use('/api/v1/books',booksRoutes)

app.listen(port,()=>{
    console.log(`Server Running at port ${port}`)
})