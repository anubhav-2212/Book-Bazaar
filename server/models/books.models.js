import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        // required:true,
    },
    rating:{
        type:Number,
        // required:true,
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        // required:true,
        default:1
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
        
    }]

}
,{timestamps:true})

const Books=new mongoose.model('Books',bookSchema)
export default Books;