const FlashCard = require("../models/FlashCard");
const User = require("../models/User");
const mongoose = require("mongoose");


exports.createCard = async (req,res) =>{
    try {
        const {question,answer} = req.body;
        const userID = req.user.id;

        // validate the data
        if(
            !question ||
            !answer
        ){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory",
            })
        }
        // create card 
        const flashCard = await FlashCard.create({
            question,
            answer,
            user:userID,
        })


        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {
                $push:{
                    flashCard:flashCard._id,
                }
            },
            {new:true}
        )


        // console.log("PRINTING UPDATED USER: ",updatedUser);
        return res.status(200).json({
            success:true,
            message:"FlashCard Created Successfully",
            data:flashCard,
        })
    } catch (error) {
        console.log("ERROR IN CREATE FLASH CARD: ",error);
        return res.status(500).json({
            success:false,
            message:"Error while creating card",
        })
    }
}


exports.getCards = async (req,res) =>{
    try {
        const userID = req.user.id;

        const flashCards = await FlashCard.find({
            user:userID,
            nextReview:{$lte:Date.now()},
        })

        return res.status(200).json({
            success:true,
            message:"All flashcards of today fetched successfully",
            data:flashCards,
        })
    } catch (error) {
        console.log("ERROR IN GETTING CARDS: ",error);
        return res.status(500).json({
            success:false,
            message:"Error fetching cards",
        })
    }
}


exports.updateCard = async (req,res) =>{
    try {
        const {id} = req.params;
        const {isCorrect} = req.body;
        

        // validate the data
        if(!id){
            return res.status(404).json({
                success:false,
                message:"No Id found",
            })
        }
        // console.log("PRINTING ID: ",id);
        // console.log("PRINTING TYPE OF ID",typeof(id));
        // check if card exists with the id 
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid flashcard ID",
            });
        }

        const flashCardId = new mongoose.Types.ObjectId(id);
        const cardExists = await FlashCard.findById(flashCardId);
        if(!cardExists){
            return res.status(404).json({
                success:false,
                message:"No card exists with given id",
            })
        }

        // if is correct then increase box level
        if(isCorrect){
           cardExists.box = Math.min(cardExists.box + 1,5); 
        }
        else{
            cardExists.box = 1;
        }

        // change the review data
        const days = Math.pow(2,cardExists.box - 1);
        cardExists.nextReview = new Date(Date.now() + days*24*60*60*1000);

        await cardExists.save();

        return res.status(200).json({
            success:true,
            message:"FlashCard updated Successfully",
            data:cardExists,
        })
    } catch (error) {
        console.log("ERROR WHILE UPDATING THE CARD: ",error);
        return res.status(500).json({
            success:false,
            message:"Error, Could not update the card"
        })
    }
}

exports.deleteCard = async (req,res) =>{
    try {
        const {id} = req.params;
        const userID = req.user.id;
        // validate the data
        if(!id){
            return res.status(404).json({
                success:false,
                message:"No id Found",
            })
        }
        // check if the card exists or not
        const cardExists = await FlashCard.findById(id);
        if(!cardExists){
            return res.status(404).json({
                success:false,
                message:"No card exists with the given id",
            })
        }

        // remove the card from user model
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            {
                $pull:{
                    flashCard:cardExists._id,
                }
            },
            {new:true}
        )

        await FlashCard.findByIdAndDelete(id);

        // console.log("PRINTING UPDATED USER AFTER DELETING",updatedUser);

        return res.status(200).json({
            success:true,
            message:"FlashCard deleted Successfully",
        })
    } catch (error) {
        console.log("ERROR WHILE DELETING THE CARD: ",error);
        return res.status(500).json({
            success:false,
            message:"Error could not delete the card",
        })
    }
}