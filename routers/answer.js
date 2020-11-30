const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { getQuestionById } = require('../controllers/question');
const { createAnswer, getAnswersByQuestionId, removeAnswer, updateAnswer, getAnswerById, getanAnswer, getAnswersByUserId } = require('../controllers/answer');
const { isSignedIn, isAuthorized } = require('../controllers/auth');


//params
router.param("userId", getUserById);//

router.param("questionId", getQuestionById);//
router.param("answerId", getAnswerById);//
//read route
router.get("/answer/:answerId", getanAnswer)
//get all answer of a question
router.get("/answers/:questionId", getAnswersByQuestionId)//
//get all answers of a user
router.get("/user/answers/:userId", getAnswersByUserId);

//create route
//create new answer
router.post("/answer/:questionId/", isSignedIn, createAnswer);//

//update route
//edit answer by the user
router.put("/answer/:answerId/:userId", isSignedIn, isAuthorized, updateAnswer);//

//delete route 
//delete answer by the user
router.delete("/answer/:answerId/:userId", isSignedIn, isAuthorized, removeAnswer);//

module.exports = router;
