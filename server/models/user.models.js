import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password:{
        type:String,
        required:true,
         minlength: [6, "Password must be at least 6 characters"],
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    }
},
{timestamps:true

})

const User=new mongoose.model('User',userSchema)
export default User;