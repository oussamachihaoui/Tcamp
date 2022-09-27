const Campground = require('../models/campground');


module.exports.index=async(req,res)=>{
    const campGrounds = await Campground.find({});
    res.render('camps/campgrounds' ,{campGrounds})
}

//****************************************************************** */
module.exports.createCampForm=(req,res)=>{
    res.render('camps/new')
}

module.exports.createCamp=async(req,res)=>{
    const makeCamp = new Campground (req.body.campground);
    makeCamp.images= req.files.map(f=>({url : f.path , filename : f.filename}))
    makeCamp.owner = req.user._id;
    await makeCamp.save()
    req.flash('success' , ' Successfully made a new campground')
    res.redirect(`/campgrounds/${makeCamp._id}`)
}

//*************************************************************************** */
module.exports.showCampground=async(req,res ,)=>{
    const {id} = req.params;
    const foundCamp = await Campground.findById(id).populate({
        path:'reviews',
        populate:{
            path:'owner'
        }
        
    }).populate('owner');
   
    if(!foundCamp){
        req.flash('error' , ' Campground is not found');
        res.redirect('/campgrounds');
    }
    res.render('camps/show' , {foundCamp})
 
}


//************************************************************** */
module.exports.editCampForm = async (req,res, )=>{
    const {id} = req.params;
    const foundCamp = await Campground.findById(id);
    if(!foundCamp){
        req.flash('error' , ' Campground is not found');
        res.redirect('/campgrounds');
    }
    
    if (!foundCamp.owner.equals(req.user._id)){
        req.flash('error' , 'You do no have permission');
       return res.redirect(`/campgrounds/${id}`)
    }
    res.render('camps/edit' , {foundCamp})
}

module.exports.updatedCamp=async (req,res)=>{
    const {id} = req.params;

    const campground=  await Campground.findById(id)
    if (!campground.owner.equals(req.user._id)){
        req.flash('error' , 'You do no have permission');
       return res.redirect(`/campgrounds/${id}`)
    }

    const updated = await Campground.findByIdAndUpdate( id , {...req.body.campground})
    const imgs = req.files.map(f=>({url : f.path , filename : f.filename}));
    updated.images.push(...imgs);
    await updated.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            //logs cloudinary conataining uploader, still uploader is undefined
            console.log(cloudinary,cloudinary.uploader); 
            await cloudinary.uploader.destroy(filename);
        }
        await updated.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    
    req.flash('success' , ' Successfully updated a campground')
    res.redirect(`/campgrounds/${updated._id}`)
}
//**************************************************************************** */
module.exports.deleteCamp=async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success' , ' Successfully deleted a campground')
    res.redirect('/campgrounds');
}