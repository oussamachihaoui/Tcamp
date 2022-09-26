const express = require('express');
const router = express.Router({mergeParams : true});
const Campground = require('../models/campground');
const CatchAsyncError = require('../utilities/CatchAsyncError');
const Review = require('../models/review');
const isLoggedIn = require('../isloginmidware');


// ************************************* NESTED ROUTES **************************************************************
// make a review for each camp
router.post('/' , isLoggedIn, CatchAsyncError(async(req,res)=>{
    const {id}= req.params;
    const campground =  await Campground.findById(id);
    const review = new Review(req.body.review);
    review.owner=req.user._id;
    campground.reviews.push(review);
    await campground.save();
    await review.save();
    req.flash('success' , ' Successfully made a review')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// delete a review from a specific camp
router.delete('/:reviewID' , isLoggedIn, CatchAsyncError(async(req,res)=>{
    const {id , reviewID} = req.params;
    const review=  await Review.findById(reviewID)
    if (!review.owner.equals(req.user._id)){
        req.flash('error' , 'You do no have permission');
       return res.redirect(`/campgrounds/${id}`)
    }
    await Campground.findByIdAndUpdate(id , {$pull : {reviews:reviewID}});
    await Review.findByIdAndDelete(reviewID);
    req.flash('success' , ' Successfully deleted a review')
    res.redirect(`/campgrounds/${id}`)
}))


module.exports=router;