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
   
    const existingCartItem=await Cart.findOne({userId:id,bookId:bookDetails._id})
    if(existingCartItem){

        
    const newQuantity=existingCartItem.quantity +quantity;
    if(newQuantity>bookDetails.stock){
        return res.status(400).json({
            success:false,
            message:"Stock Not Available"
        })
    }
        existingCartItem.quantity=newQuantity
        await existingCartItem.save();
        return res.status(200).json({
            success:true,
            message:"Cart Item Updated Successfully",
            data:existingCartItem,
           
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
export const getCartItems=async(req,res)=>{
    const {id}=req.user;
    const cartItems=await Cart.find({userId:id})
    if(!cartItems||cartItems.length===0){
        return res.status(400).json({
            success:false,
            message:"No Cart Items Found"
        })
    }
    res.status(200).json({
        success:true,
        data:cartItems
    })
}
export const deleteCartItem=async(req,res)=>{
    const{id}=req.user;
    console.log(id);
    const {cartItemId}=req.params;
    console.log(cartItemId);
    const deletedCartItem=await Cart.findByIdAndDelete(cartItemId)
    if(!deletedCartItem){
        return res.status(400).json({
            success:false,
            message:"Cart Item Not Found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Cart Item Deleted Successfully",
        data:deletedCartItem
    })
}