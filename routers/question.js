const express = require('express');
const router = express.Router();

const { getQuestions,
    getaQuestion,
    getQuestionsByUserId,
    createQuestion,
    updateQuestion,
    removeQuestion,
    getQuestionById,
    searchQuestion } = require("../controllers/question");
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthorized } = require('../controllers/auth');


//params
router.param("userId", getUserById);//

router.param("questionId", getQuestionById);//


//read route
//get all question
router.get("/questions", getQuestions)//
//all questions of a user
router.get("/questions/:userId", getQuestionsByUserId);//
//get a question by id
router.get("/question/:questionId", getaQuestion);//

//search a question
router.get("/search/questions/", searchQuestion)

//create route
//create new questions
router.post("/question/", isSignedIn, createQuestion);//

//update route
//edit question by the user
router.put("/question/:questionId/:userId", isSignedIn, isAuthorized, updateQuestion);//

//delete route 
//delete question by the user
router.delete("/question/:questionId/:userId", isSignedIn, isAuthorized, removeQuestion);//

module.exports = router;
