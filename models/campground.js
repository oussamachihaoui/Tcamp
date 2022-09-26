// Creating campground schema
const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


const campgroundSchema = new Schema ({
    title :String,
    price : Number,
    location : String,
    images: [{
        url : String ,
        filename : String 
    }],
    description : String ,
    owner : {
        type :Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'Review'
    }
    ]
})

// middleware mongoose function
campgroundSchema.post('findOneAndDelete' ,async function (camp){
    if(camp){
       const respond = await Review.deleteMany({_id :{$in :camp.reviews}});
       console.log(respond);
    }
    })



const Campground = mongoose.model('Campground' , campgroundSchema)

module.exports = Campground ;