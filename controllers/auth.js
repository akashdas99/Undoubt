const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    //if user exists
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            return res.status(400).json({
                error: "User exists"
            })
        }
        if (err)
            return res.status(400).json({
                error: err
            })
    })
    const user = new User(req.body)

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to hash password"
            })
        }
        user.password = hash;
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save user"
                })
            }
            res.json({ name: user.name, email: user.email })
        })
    })


}
exports.signin = (req, res) => {//todo compare
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User doesnot exists"
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({
                    error: "Incorrect password"
                })
            }
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            return res.json({ token: token, userId: user._id });
        })

    })

}
exports.signout = (req, res) => {
    return res.json("Signed out");
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'

})
exports.isAuthorized = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied",
        });
    }
    next();
}