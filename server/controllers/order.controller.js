export const addOrder = async (req, res) => {
    try {
        const{shippingInfo,orderItems,paymentInfo,totalAmount}=req.body
    if(!shippingInfo||!orderItems||!paymentInfo||!totalAmount){
        return res.status(401).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const newOrder=await new Order({
        shippingInfo,
        orderItems,
        paymentInfo,
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
        const{userId}=req.user;
        console.log(userId)
        
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