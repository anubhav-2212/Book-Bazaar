import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import crypto from "crypto";





export const register = async (req, res) => {
try {
    const{name,email,password}=req.body;
    if(!name||!email||!password){
        return res.status(401).json({
            success:false,
            message:"Credentails Missing"
        })
    }
    const exisitngUser=await User.findOne({email})
    if(exisitngUser){
         return res.status(401).json({
            success:false,
            message:"User Already Exist "
        })

    }
    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const newUser=await new User({
        name,
        email,
        password:hashedPassword
    })
    await newUser.save()
    
    res.status(201).json({
        success:true,
        message:"User Registered Succesfully"
    })
    
} catch (error) {
    console.log(error)

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((val) => val.message),
      });
    }

    // 🔹 7. Duplicate email error handling
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
    
}
};

export const login=async(req,res)=>{
    const{email,password}=req.body;
    // console.log(email,password)
    if(!email||!password){
        return res.status(401).json({
            success:false,
            message:"Credentails Missing"
        })
        
    }
    try {
        const user=await User.findOne({email});
        // console.log(user);
        if(!user){
            return res.status(401).json({
            success:false,
            message:"User Does Not Exist"
        })

        }
        const isMatch=await bcrypt.compare(password,user.password)
        // console.log(isMatch);
        if(!isMatch){
               return res.status(401).json({
            success:false,
            message:"Invalid Email or Password"
        }) 
        }
        // console.log(process.env.JWT_SECRET_KEY)
        const token= jwt.sign({id:user._id},
            process.env.JWT_SECRET_KEY,{
                expiresIn:"24h"
            }
        )
        // console.log(token)
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge:24*60*60*1000,
            secure:true
        })
        res.status(200).json({
            success:true,
            message:"User Logged In Successfully"
        })
        } 
        catch (error) {
        console.log(error)
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
 }
}

export const generateApiKey=async(req,res)=>{
    try {
        const userId = req.user.id; // Assumes user is authenticated and user id is available
        const apiKey = crypto.randomBytes(32).toString("hex");
        const user = await User.findByIdAndUpdate(userId, { apiKey }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, apiKey });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getMe=async(req,res)=>{}
