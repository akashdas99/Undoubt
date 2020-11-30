const mongoose = require('mongoose');


//user schema
const userSchema = mongoose.Schema(
    {
        //name of the user
        name: {
            type: String,
            maxlength: 40,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }],
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }]
    }, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)