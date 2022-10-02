const express = require('express');
const router = express.Router({mergeParams : true});
const Campground = require('../models/campground');
const CatchAsyncError = require('../utilities/CatchAsyncError');
const Review = require('../models/review');
const isLoggedIn = require('../isloginmidware');
const reviews= require('../controllers/reviews')
const {reviewSchema}=require('../schemaJoi')
const ExpressError = require('../utilities/ExpressError');



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// ************************************* NESTED ROUTES **************************************************************
// make a review for each camp
router.post('/' , isLoggedIn, validateReview, CatchAsyncError(reviews.makeReviews))

// delete a review from a specific camp
router.delete('/:reviewID' , isLoggedIn, CatchAsyncError(reviews.deleteReview))


module.exports=router;