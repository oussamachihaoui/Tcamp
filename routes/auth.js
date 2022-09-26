const express = require ('express');
const router = express.Router();
const User = require('../models/user');
const CatchAsyncError = require('../utilities/CatchAsyncError')
const passport = require('passport')
const session = require('express-session');


// ********************************************************************register route
router.get('/register' ,(req,res)=>{
    res.render('auth/register')
})

router.post('/register' , CatchAsyncError (async(req,res ,next)=>{
   try {
        const {username , email , password}=req.body;
        const user = new User({username , email});
        const registerUser = await User.register(user,password);
        req.login(registerUser,err=>{
            if(err)return next (err)
            req.flash('success' , 'Welcome to Tcamp')
            res.redirect('/campgrounds')
        })
   } catch (err){
    req.flash('error' , err.message);
    res.redirect('/register')
   }
}))

// **********************************************************************login route
router.get('/login' ,(req,res)=>{
    res.render('auth/login')
})

router.post('/login' ,passport.authenticate('local' , {failureFlash:true , failureRedirect: '/login'}) , (req,res)=>{
req.flash('success' , 'Welcome back !');
const returnUrl = req.session.returnTo || '/campgrounds';
res.redirect(returnUrl)
})


// *********************************************************************logout route
router.get('/logout' ,(req,res)=>{
    req.logout()
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
})

module.exports=router;

