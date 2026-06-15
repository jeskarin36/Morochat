import mongoose from "mongoose";

const messageSchema =new mongoose.Schema({
  senderId:{
    type:mongose.Schema.Types.ObjectId,
    ref:"User",
    require:"true"
  },
  
    receiverId:{
        type: mongose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    }
    ,
    video:{
        type:String,
    }
  

},{timestamps:"true"})

const Menssage =mongoose.model("Menssage",messageSchema);

export default Message;