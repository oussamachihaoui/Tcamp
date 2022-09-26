const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const CatchAsyncError = require('../utilities/CatchAsyncError');
const isLoggedIn = require('../isloginmidware');
const { populate } = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
//************************************************************************************** */
const {storage} = require('../cloudinary')
const multer  = require('multer');
const upload = multer({ storage });
const cloudinary = require('../cloudinary');

// creating index template
router.get('/' , CatchAsyncError (campgrounds.index))

//make a new campground
router.get('/newcamp', isLoggedIn,campgrounds.createCampForm)

router.post('/' ,upload.array('image'), CatchAsyncError (campgrounds.createCamp))

//***************************************************************************************************************** */
// show all campgrounds
router.get('/:id' , CatchAsyncError (campgrounds.showCampground))



// making update templating with get  / put (update all object) request

router.get('/:id/edit' ,isLoggedIn,  CatchAsyncError (campgrounds.editCampForm)) 

router.put('/:id',upload.array('image'),isLoggedIn, CatchAsyncError (campgrounds.updatedCamp))

//*********************************************************************************************************** */

// delete a campground with ID
router.delete('/:id' ,isLoggedIn ,campgrounds.deleteCamp)













module.exports=router;