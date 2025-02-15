
const express = require("express");
const router = express.Router();


// import the required controllers

const {
    createCard,
    deleteCard,
    getCards,
    updateCard,
} = require("../controllers/FlashcardController")

// import the required middlewares

const {auth} = require("../middleware/auth")

// ********************************************************************************************************
//                                      Flashcards routes
// ********************************************************************************************************


router.post("/",auth,createCard);

router.get("/",auth,getCards);

router.put("/:id",auth,updateCard);

router.delete("/:id",auth,deleteCard);


module.exports = router;