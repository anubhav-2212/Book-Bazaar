import Order from '../models/order.models.js';

export const addOrder = async (req, res) => {
    const{id}=req.user;
    // console.log(id);

    

    try {
        const{shippingInfo,orderItems,totalAmount,status,bookId}=req.body
        console.log(shippingInfo,orderItems,status,totalAmount,bookId);
    if(!shippingInfo||!orderItems||!status||!totalAmount||!bookId){
        return res.status(400).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const newOrder=new  Order({
        userId:id,
        bookId,
        shippingInfo,
        orderItems,
        status,
        totalAmount
    })
    await newOrder.save()
    res.status(201).json({
        success:true,
        message:"Order Added Successfully",
        data:newOrder
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error
        })
        
    }
    
}
export const getUserOrder=async(req,res)=>{
    try {
        const userId=req.user.id;
        const orders=await Order.find({userId}).select("-shippingInfo").sort({createdAt:-1})
        if(!orders||orders.length===0){
            return res.status(400).json({
                success:false,
                message:"No Orders Found"
            })
        }
        res.status(200).json({
            success:true,
            data:orders
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error
        })
        
    }


   
}
export const getOrdersById=async(req,res)=>{}