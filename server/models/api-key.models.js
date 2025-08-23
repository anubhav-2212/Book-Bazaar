import mongoose from "mongoose";

const apiKeySchema= new mongoose.Schema({
    apiKey:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const ApiKey=new mongoose.model('ApiKey',apiKeySchema)
export default ApiKey