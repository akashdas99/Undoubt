const formidable = require("formidable");
const Answer = require('../models/answer');
const Question = require("../models/question");
const User = require('../models/user');
const _ = require("lodash");


exports.getAnswerById = (req, res, next, id) => {
    Answer.findById(id).populate("author").exec((err, ans) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to find answer by id"
            })
        }
        req.ans = ans;
        next();
    })
}
//get an answer by id
exports.getanAnswer = (req, res) => {
    res.json(req.ans);
}
//get answer by user id
exports.getAnswersByUserId = (req, res) => {
    Answer.find({ author: req.profile._id }).populate("author").populate("question")
        .exec((err, answers) => {
            if (err) {
                return res.status(400).json({
                    error: "Error loading answers of user"
                });
            }
            res.json(answers);
        })
}

//get answers of a question
exports.getAnswersByQuestionId = (req, res) => {
    Answer.find({ question: req.question._id })
        .populate("author")
        .exec((err, ans) => {
            if (err) {
                return req.status(400).json({
                    error: "Error loading answers of user"
                });
            }
            res.json(ans);
        })
}
//create answer
exports.createAnswer = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Form data error"
            })
        }

        if (!fields.description) {
            return res.status(400).json({ error: "Incomplete answer" });
        }

        let answer = new Answer(fields);

        answer.author = req.auth._id;
        answer.question = req.question._id;

        answer.save((err, answer) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: "Unable to save question in db"
                });
            }
            Question.findOneAndUpdate(
                { _id: req.question._id },
                {
                    $push: { answers: answer._id }
                }, { new: true },
                (err, _) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Unable to add answer to the question"
                        })
                    }
                })
            res.json(answer);
        })
    })


}

//update answer

exports.updateAnswer = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Form data error"
            })
        }

        if (!fields.description) {
            return res.status(400).json({ error: "Incomplete answer" });
        }

        let answer = req.ans;
        answer = _.extend(answer, fields);
        answer.save((err, answer) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to update answer in db"
                });
            }
            res.json(answer);
        })
    })

}

//delete answer
exports.removeAnswer = (req, res) => {

    const answer = req.ans;
    Question.findOneAndUpdate(
        { _id: answer.question._id },
        {
            $pull: { answers: answer._id }
        }, { new: true },
        (err, _) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to remove answer to the question"
                })
            }
        })
    answer.remove((err, _) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete answer"
            });
        }

        res.json({
            message: "Answer Removed Successfully"
        })
    })
}
