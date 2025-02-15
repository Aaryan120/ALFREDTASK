const mongoose = require("mongoose");


exports.dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(() => {
        console.log("DB connected Successfully");
    })
    .catch((error) =>{
        console.log(error);
        console.log("DB CONNECTION FAILED");
        process.exit(1);
    })
}
