const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const CatchAsyncError = require('../utilities/CatchAsyncError')
const passport = require('passport')
const session = require('express-session');
const users = require('../controllers/users')


// ********************************************************************register route
router.get('/register' ,users.registerUserForm)

router.post('/register' , CatchAsyncError (users.registeringUser))

// **********************************************************************login route
router.get('/login' ,users.loginUser)

router.post('/login' ,passport.authenticate('local' , {failureFlash:true , failureRedirect: '/login'}) , users.loggingInUser)


// *********************************************************************logout route
router.get('/logout' ,users.loggingOutUser)

module.exports=router;

