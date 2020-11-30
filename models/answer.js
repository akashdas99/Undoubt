const mongoose = require('mongoose');



const answerSchema = mongoose.Schema(
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
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);