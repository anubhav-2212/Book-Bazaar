import Cart from "../models/cart-items.models.js";
import Books from "../models/books.models.js";


export const addCartItem=async(req,res)=>{
    const {id}=req.user;
    // console.log(id);
    const {bookId}=req.params;
    // console.log(bookId);
    const{quantity}=req.body;
    if(!quantity||!bookId){
        return res.status(400).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const bookDetails=await Books.findById(bookId)
    if(!bookDetails||!bookDetails._id){
        return res.status(400).json({
            success:false,
            message:"Book Not Found"
        })  
    }
    // console.log(bookDetails);
    if(quantity>bookDetails.stock){
        return res.status(400).json({
            success:false,
            message:"Stock Not Available"
        })
    }
    if(quantity<1){
        return res.status(400).json({
            success:false,
            message:"Invalid Quantity"
        })
    }
    
    const newCartItem=await new Cart({
        userId:id,
        bookId:bookDetails._id,
        quantity,
        price:bookDetails.price
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