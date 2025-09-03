import mongoose from "mongoose";

const cartItemsSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

},{
    timestamps:true
})

const Cart=new mongoose.model('Cart',cartItemsSchema)
export default Cart;