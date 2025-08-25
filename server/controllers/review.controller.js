import Books from "../models/books.models.js";
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
    await Books.findByIdAndUpdate(bookId,{
        $push:{reviews:newReview._id}
    })
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
export const getReview=async(req,res)=>{
    try {
          const{bookId}=req.params
    // console.log(bookId);
    const userId=req.user.id
    // console.log(userId)
//populate converts reviews id in actual review document
    const allReviews=await Books.findById(bookId).populate({
    path: "reviews",
 populate: {
    path: "userId",   // Review schema me userId ref hoga User model se
    select: "name email"   // Sirf yeh fields chahiye
  }})
    // console.log(allReviews);

    res.status(200).json({
        success:true,
        message:"All Reviews",
        allReviews
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


export const deleteReview=async(req,res)=>{
    try {
        // console.log(req.params);
         const{reviewId}=req.params;
        //  console.log(reviewId);
        console.log(req.user.id)
         if(!reviewId){
            return res.status(401).json({
                success:false,
                message:"Review not found"
            })
         }
         const review=await Review.findById(reviewId)
         console.log(review.userId.toString())
        //  console.log(review)
        if(review.userId.toString()!==req.user.id){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"

            })
        }

         const deletedReview=await Review.findByIdAndDelete(reviewId)
        //  console.log(deletedReview);
        //book model se review ko hata diya gya yaha pe
         await Books.findByIdAndUpdate(review.bookId, { $pull: { reviews: reviewId } });
         res.status(200).json({
            success:true,
            Message:"Review Deleted Succesfully"
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