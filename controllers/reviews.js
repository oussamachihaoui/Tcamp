const Review = require('../models/review');
const Campground = require('../models/campground');

//
module.exports.makeReviews=async(req,res)=>{
    const {id}= req.params;
    const campground =  await Campground.findById(id);
    const review = new Review(req.body.review);
    review.owner=req.user._id;
    campground.reviews.push(review);
    await campground.save();
    await review.save();
    req.flash('success' , ' Successfully made a review')
    res.redirect(`/campgrounds/${campground._id}`);
}

//
module.exports.deleteReview= async(req,res)=>{
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
}