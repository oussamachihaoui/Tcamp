const express = require('express');
const router = express.Router({mergeParams : true});
const Campground = require('../models/campground');
const CatchAsyncError = require('../utilities/CatchAsyncError');
const Review = require('../models/review');
const isLoggedIn = require('../isloginmidware');
const reviews= require('../controllers/reviews')


// ************************************* NESTED ROUTES **************************************************************
// make a review for each camp
router.post('/' , isLoggedIn, CatchAsyncError(reviews.makeReviews))

// delete a review from a specific camp
router.delete('/:reviewID' , isLoggedIn, CatchAsyncError(reviews.deleteReview))


module.exports=router;