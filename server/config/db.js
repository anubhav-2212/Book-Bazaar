import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db=async()=>{
      await mongoose.connect(process.env.MONGO_URL)
     .then((res)=>{
        console.log("Database Connected")
     })
     .catch((err)=>{
        console.log("error connecting database",err)
     })
}
export default db;