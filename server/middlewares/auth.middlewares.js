import User from "../models/user.models.js";
export const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log(decodedToken);
    const user=await User.findById(decodedToken.id)
    req.user=user
    next();

        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
        
    }
}
    

export const checkAdmin=async (req, res, next) => {
    if (req.user.role !== "Admin"||req.user.role.length===0) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
    
}

