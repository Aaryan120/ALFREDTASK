const mongoose = require("mongoose");


const FlashcardSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    box:{
        type:Number,
        default:1,
    },
    nextReview:{
        type:Date,
        default:Date.now(),
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})


module.exports = mongoose.model("FlashCard",FlashcardSchema);

