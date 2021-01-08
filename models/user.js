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
        profession: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)