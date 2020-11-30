const express = require('express');

const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth")
//Todo:add checks
//sign up route
router.post("/signup", signup);

//signin route
router.post("/signin", signin);

//signout route
router.get("/signout", signout);

module.exports = router;