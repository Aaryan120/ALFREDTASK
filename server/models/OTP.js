const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/template/emailVerificationTemplate");


const OTP = new mongoose.Schema({
    otp:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})


async function sendVerificationMail(email,otp){
    try {
        const mailResponse = await mailSender(
            email,
            "Verification OTP from Trilingo-Flashcard",
            otpTemplate(otp),
        )
        
    } catch (error) {
        console.log("ERROR IN SEND VERIFICATION MAIL: ",error);
        throw(error);
    }
}

OTP.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otp);
    next();
})




module.exports = mongoose.model("OTP",OTP);