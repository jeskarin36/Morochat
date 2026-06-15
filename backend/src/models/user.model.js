import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    clerkId:{
 type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    fullname:{
         type:String,
        require:true,
    },
    profilePic:{
         type:String,
          default:"",
    }

},{timestamps:true})


const User= mongoose.model("user",userSchema);

export default User;