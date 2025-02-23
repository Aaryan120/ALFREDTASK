const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email,title,body) =>{
    try {
        let transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })


        let info = await transport.sendMail({
            from:"Trilingo-FLashcard by Raj Aryan",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        // console.log("PRINTING MAIL INFO: ",info);
        return info;
    } catch (error) {
        console.log("ERROR SENDING MAIL IN MAIL SENDER:",error);
    }
}

module.exports = mailSender;