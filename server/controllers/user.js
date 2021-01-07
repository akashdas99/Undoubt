const User = require('../models/user');


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No User Found"
            })
        }
        user.password = undefined;

        req.profile = user
        next()
    });
}

exports.getUser = (req, res) => {
    res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.password = undefined;
            res.json(user);
        }
    )
}

exports.deleteUser = (req, res) => {
    //Todo
}