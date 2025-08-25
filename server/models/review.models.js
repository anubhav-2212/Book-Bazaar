import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})

const Review=new mongoose.model('Review',reviewSchema)
export default Review;