const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next) =>{
    try {
        const token = req.body.token || req.header("Authorization").replace("Bearer ","");


        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing,Please login again",
            });
        }

        // decode the token
        try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            // console.log("PRINTING THE DECODE: ",decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is Invalid",
            })          
        }

        next();
    } catch (error) {
        console.log("ERROR WHILE VALIDATING THE TOKEN: ",error);
        return res.status(500).json({
            success:false,
            message:"Error validating the token"
        })        
    }
}