const User = require('../models/user');


module.exports.registerUserForm = (req,res)=>{
    res.render('auth/register')
}


module.exports.registeringUser  = async(req,res ,next)=>{
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
 }


module.exports.loginUser =(req,res)=>{
    res.render('auth/login')
}

module.exports.loggingInUser=(req,res)=>{
    req.flash('success' , 'Welcome back !');
    const returnUrl = req.session.returnTo || '/campgrounds';
    res.redirect(returnUrl)
}


module.exports.loggingOutUser=function(req,res,next){
    req.logout(function(err){
        if (err){
            return next(err);
        }
        req.flash('success', "logged Out");
        res.redirect('/campgrounds');
    });  
}


