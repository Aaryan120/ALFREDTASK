const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/User");
const flashCardRoutes = require("./routes/Flashcard");

const database = require("./config/database")
const cors = require("cors");


const PORT = process.env.PORT || 4000;

database.dbConnect();

app.use(
    cors({
        origin:'http://localhost:3000',
        credentials:true,
    })
)

app.use(express.json());
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/flashcards",flashCardRoutes);

app.use(
    cors({

    })
)

app.get("/",(req,res) =>{
    return res.json({
        success:true,
        message:"Your server is up and running",
    })
})


app.listen(PORT,() =>{
    console.log(`App is running at ${PORT}`)
})

