// Creating campground schema
const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const campgroundSchema = new Schema ({
    title :String,
    price : Number,
    location : String,
    images: [{
        url : String ,
        filename : String 
    }],
    geometry :{
        type: {
            type: String, 
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        },
    
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
}, opts)

//virtual middleware
campgroundSchema.virtual('properties.popUpHtml').get(function() {
    return `<b><a href="/campgrounds/${this._id}"> ${this.title} </a> </b>
    <p>${this.description.substring(0.10)}</p>`
  });



// middleware mongoose function
campgroundSchema.post('findOneAndDelete' ,async function (camp){
    if(camp){
       const respond = await Review.deleteMany({_id :{$in :camp.reviews}});
       console.log(respond);
    }
    })



const Campground = mongoose.model('Campground' , campgroundSchema)

module.exports = Campground ;