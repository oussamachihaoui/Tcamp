if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
// express & mongoose & handle errors & ejs-mate & passport(authaunication)
const express = require('express');
const app = express();
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const localStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');



mongoose.connect('mongodb://localhost:27017/camp',{
    // useNewUrlParser: true, // <-- no longer necessary in mongoose 6
    // useUnifiedTopology: true // <-- no longer necessary in mongoose 6
}).then(()=>{
    console.log('Connected to Tcampground Database');
}).catch ((err)=>{
    console.log('Error 404!' );
    console.log(err);
})



// require data  & functions from other directories
const ExpressError = require('./utilities/ExpressError');
const CatchAsyncError = require('./utilities/CatchAsyncError');
const {campgroundSchema}=require('./schemaJoi')//-->not used yet
const User = require('./models/user');



//  PATH & EJS & PARSING REQ.BODY & OVERRIDE & JOI & JOI & SESSION & FLASH

const path = require('path');
app.set('view engine', 'ejs');
app.set(' views', path.join(__dirname, '/views'));
app.engine('ejs',engine);
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const Joi = require('joi');//---> not used yet
app.use(express.static('public'))
const sessionSettings={
    name :'tcamp',
    secret : '123456789',
    resave : false,
    saveUninitialized: true,
    cookie : {
        httpOnly : true,
        //secure : true,
        expires : Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*14,
    }
}
// flash & session & passport & mongo_sanitize & helmet
app.use(session(sessionSettings));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(mongoSanitize());






// flash middleware & global locals
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


//***********************************************************routes for campgrounds & reviews  & register ****************************************************** */
const campgroundsRoutes = require('./routes/campgrounds');
app.use('/campgrounds' , campgroundsRoutes);

const reviewsRoutes = require('./routes/reviews');
app.use('/campgrounds/:id/reviews' , reviewsRoutes);

const authRoutes = require('./routes/auth');
app.use('/' , authRoutes);




// demo checking templating
app.get('/home' ,( req , res)=>{
    res.render('home');
})






// for all routes
app.all('*' ,( req , res , next)=>{
    next( new ExpressError ('Unavaiblable page' , 404))
})

//Error handling
app.use((err , req , res, next)=>{
        const {status = 500} = err;
        if(!err.message) err.message='Oh no something went wrong'
        res.status(status).render('error' , {err});
    
})

// localhost port
app.listen(3000 ,()=>{
    console.log('Listening on port 3000')
})