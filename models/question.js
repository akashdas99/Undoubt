const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            maxlength: 100,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
        }]
    }, { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);