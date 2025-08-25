import Review from "../models/review.models.js";
export const addReview=async(req,res)=>{
    try {
        // console.log(req.params);
          const {bookId}=req.params;
        //   console.log(bookId);
    const userId=req.user.id;
    // console.log(userId);
    const {rating,comment}=req.body
    if(!rating||!comment){
        return res.status(401).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const newReview=await new Review({
        bookId,
        userId,
        rating,
        comment
    })
    await newReview.save()
    res.status(201).json({
        success:true,
        message:"Review Added Successfully",
        data:newReview  
        
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error
        })
        
    }
  

    

}
export const getReview=async(req,res)=>{}

export const deleteReview=async(req,res)=>{}