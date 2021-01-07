const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser, deleteUser } = require('../controllers/user');
const { isSignedIn, isAuthorized } = require('../controllers/auth');

//params
router.param("userId", getUserById);
router.get("/user/:userId", getUser);

//update user info
router.put("/user/update/:userId", isSignedIn, isAuthorized, updateUser);
router.delete("/user/delete/:userId", isSignedIn, isAuthorized, deleteUser);

module.exports = router;
