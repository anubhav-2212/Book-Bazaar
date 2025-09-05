import Cart from "../models/cart-items.models.js";
import Books from "../models/books.models.js";

export const addCartItem=async(req,res)=>{
    const {userId}=req.user
    console.log(useId);
    const{bookId,quantity,price}=req.body;
    if(!bookId||!quantity||!price){
        return res.status(400).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const newCartItem=await new Cart({
        userId,
        bookId,
        quantity,
        price
    })
    await newCartItem.save()
    res.status(201).json({
        success:true,
        message:"Cart Item Added Successfully",
        data:newCartItem
    })

}
export const getCartItems=async(req,res)=>{}
export const deleteCartItem=async(req,res)=>{}