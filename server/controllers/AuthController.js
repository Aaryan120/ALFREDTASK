const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.sendOTP = async (req,res) =>{
    try {
        const {email} = req.body;

        if(!email){
            return res.status(404).json({
                success:false,
                message:"Email Not Found",
            })
        }

        const userExists = await User.findOne({email:email});
        if(userExists){
            return res.status(401).json({
                success:false,
                message:"User Already Registered,Please Try Again",
            })
        }

        // if user does not exist generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            digits:true,
        })

        let otpExists = await OTP.findOne({otp:otp});

        while(otpExists){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
                digits:true,
            })
    
            otpExists = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:"OTP Sent SuccessFully",
            data:otpBody,
        })
    } catch (error) {
        console.log("ERROR IN SENDING OTP CONTROLLER: ",error);
        return res.status(500).json({
            success:false,
            message:"Error while sending OTP"
        })   
    }
}


exports.signUp = async (req,res) =>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        } = req.body;

        if(
            !firstName ||
            !lastName || 
            !email || 
            !password ||
            !confirmPassword ||
            !otp
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory",
            })
        }

        // Check if user does not already exists
        const userExists = await User.findOne({email:email});
        if(userExists){
            return res.status(401).json({
                success:false,
                message:"User already registered, Please Login",
            })
        }

        // check if password matches
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Passwords do not match",
            })
        }
        // verify the otp
        const recentOtp = await OTP.find({email:email}).sort({createAt:-1}).limit(1);

        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"No otp exists for user",
            })
        }
        if(recentOtp[0].otp != otp){
            return res.status(401).json({
                success:false,
                message:"Wrong OTP"
            })
        }


        // save the user entry in database
        const hashedPassword = await bcrypt.hash(password,10);


        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            imageUrl:"",
        })


        return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            data:userDetails
        })
    } catch (error) {
        console.log("ERROR IN SIGN IN CONTROLLER: ",error);
        return res.status(500).json({
            success:false,
            message:"Error Signing In",
        })
    }
}



exports.login = async (req,res) =>{
    try {
        const {email,password} = req.body;

        // validate the data
        if(
            !email ||
            !password
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory",
            })
        }

        // check if user exists
        const userExists = await User.findOne({email:email});

        if(!userExists){
            return res.status(401).json({
                success:false,
                message:"User not Registered,Please Sign In",
            })
        }

        // if user exits then match the password
        if(await bcrypt.compare(password,userExists.password)){
            // generate jwt token
            const payload = {
                id:userExists._id,
                email:userExists.email,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            })

            userExists.token = token;
            userExists.password = undefined;


            return res.status(200).json({
                success:true,
                message:"User logged in successfully",
                data:userExists,
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Passwords is Incorrect",
            })
        }
    } catch (error) {
        console.log("ERROR IN LOGIN CONTROLLER",error);
        return res.status(500).json({
            success:false,
            message:"Error Logging In",
        })
        
    }
}