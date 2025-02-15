const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    flashCard:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FlashCard",
    }],
    imageUrl:{
        type:String,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    }
})


module.exports = mongoose.model("User",UserSchema);