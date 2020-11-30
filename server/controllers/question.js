const Question = require("../models/question");
const Answer = require("../models/answer");
const formidable = require("formidable");
const _ = require("lodash");

//get question by id

exports.getQuestionById = (req, res, next, id) => {
    Question.findById(id).populate("answers").populate("author").exec((err, question) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to find question by id"
            })
        }
        req.question = question;
        next();
    })

}
//load all questions
exports.getQuestions = (req, res) => {
    Question.find()
        .populate("author")
        .sort([["_id", "asc"]])
        .exec((err, questions) => {
            if (err) {
                return res.status(400).json({
                    error: "Error loading questions"
                });
            }
            res.json(questions);
        })
}
//
exports.getaQuestion = (req, res) => {
    res.json(req.question);
}
//load questions of a user
exports.getQuestionsByUserId = (req, res) => {
    // console.log(req.profile);
    Question.find({ author: req.profile._id }).populate("author")
        .exec((err, questions) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: "Error loading questions of user"
                });
            }
            res.json(questions);
        })
}
//search question by text
exports.searchQuestion = (req, res) => {
    // console.log("search");

    Question.find({ description: { $regex: req.query.q, $options: "i" } })
        .exec((err, questions) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: "Error loading questions"
                });
            }
            res.json(questions);
        })
}
//create new question
exports.createQuestion = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Form data error"
            });
        }

        if (!fields.description) {
            return res.status(400).json({
                error: "Incomplete question description"
            });
        }
        console.log("ok");
        let question = new Question(fields);
        // console.log(req.auth);
        question.author = req.auth._id;

        question.save((err, question) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save question in db"
                });
            }
            res.json(question);
        })


    })
}

//update question
exports.updateQuestion = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Form data error"
            });
        }

        let question = req.question;
        // console.log(question);
        question = _.extend(question, fields);

        question.save((err, question) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save question in db"
                });
            }
            res.json(question);
        })


    })
}

//delete

exports.removeQuestion = (req, res) => {
    const question = req.question;
    question.remove((err, removeQuestion) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete question"
            });
        }
        Answer.remove({ _id: { $in: req.question.answers } },
            () => console.log("removed ans"))//todo
        res.json({
            message: "Question Removed Successfully"
        })
    })
}