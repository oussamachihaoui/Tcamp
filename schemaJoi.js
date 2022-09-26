const Joi = require('joi');

//     // VALIDATION ON SERVER SIDE *************************************************
// const validateSchema = (req,res,next)=>{
//     const campgroundSchema = Joi.object({
//         campground: Joi.object({
//             title : Joi.string().required(),
//             location: Joi.string().required(),
//             price: Joi.number().min(0).required(),
//             image: Joi.string().required(),
//             description : Joi.string().required(),
//         }).required()
//     })
//     const {error} = campgroundSchema.validate(req.body);
//     if (error){
//         const msg = error.details.map(e=> e.message).join(',')
//         throw new ExpressError(msg , 400)
//     } else {
//         next();
//     }
// }


module.exports= reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required(),
        body : Joi.string().required()
    })
}).required


    