import { Router }       from 'express';
import { flashMessage } from '../utils/flashmsg.mjs';

//Nigel's
import { ModelReview } from '../data/review.mjs';
import {ModelFaq} from '../data/faq.mjs';

// Qiao Qing's
import { ModelHomeDescription } from '../data/homedescription.mjs';
import { ModelHomeImagePolicy } from '../data/homeimagepolicy.mjs';
import { ModelBestReleases } from '../data/homebestreleases.mjs';
import { ModelRooms } from '../data/rooms.mjs';
import { ModelMovies } from '../data/movies.mjs';
import { ModelSongs } from '../data/karaoke.mjs';

import path from 'path';
import multer from 'multer';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';

const router = Router();
export default router;
// ---------------- 

// Creates static folder for publicly accessible HTML, CSS and Javascript files
router.use(express.static(path.join(process.cwd(), 'public')));
router.use(methodOverride('_method'));

router.get("/", home_page);
// '/edit/:id'
router.get("/edithomedes", edithomedescription_page);
router.post("/edithomedes", edithomedescription_process);

router.get("/edithomeimagepolicy", edithomeimagepolicy_page);

var storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './public/uploads/');
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});

// this code goes inside the object passed to multer()
function fileFilter (req, file, cb) {    
	// Allowed ext
	 const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
	const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
	   return cb(null,true);
   } else {
	   cb('Error: Images Only!');
   }
  }

const upload = multer({ 
	storage: storage,
	limits : {fileSize : 1000000},
	fileFilter : fileFilter
});

/**
 * Function to delete a uploaded file
 * @param files {...string}
**/
export function DeleteFilePath(...files) {
	for (let file of files) {
		if (FileSys.existsSync(file)) {
			console.log(`Removing from server: ${file}`);
			return FileSys.unlinkSync(file);
		}
		else
			console.warn(`Attempting to delete non-existing file(s) ${file}`);
	}
}

router.post("/edithomeimagepolicy",
upload.fields([
    { name: 'homeimage', maxCount: 1 },
    { name: 'homepolicyimage', maxCount: 1 },
  ]), 
edithomeimagepolicy_process);

router.get("/edithomebestreleases", edithomebestreleases_page);
router.post("/edithomebestreleases", edithomebestreleases_process);

router.get("/prodlist", prodlist_page);

router.get("/prodlist/editroominfo", editrooms_page);
router.post("/prodlist/editroominfo", 
upload.fields([
    { name: 'small_roomimage1', maxCount: 1 },
    { name: 'small_roomimage2', maxCount: 1 },
	{ name: 'med_roomimage', maxCount: 1 },
    { name: 'large_roomimage1', maxCount: 1 },
    { name: 'large_roomimage2', maxCount: 1 }	
  ]),
editrooms_process);

router.get("/prodlist/chooseeditmoviesandsongs", chooseeditmoviesandsongs_page);

router.get("/prodlist/editmovie", editmovie_page);
router.post("/prodlist/editmovie", editmovie_process);
router.get("/prodlist/editsong", editsong_page);
router.post("/prodlist/editsong", editsong_process);
router.get("/prodlist/createmovie", createmovie_page);
router.post("/prodlist/createmovie", createmovie_process);
router.get("/prodlist/createsong", createsong_page);
router.post("/prodlist/createsong", createsong_process);

router.get("/businessstatistics", businessstatistics_page);

/**
 * Renders the home page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function home_page(req, res) {
	// res.sendFile("dynamic/uploads/{{ }}");
	const homedes = await ModelHomeDescription.findOne({
		where: {
			"email": "root@mail.com"
		}
	});
	const homeimagepolicy = await ModelHomeImagePolicy.findOne({
		where: {
			"email": "root@mail.com"
		}
	});
	const homebestreleases = await ModelBestReleases.findOne({
		where: {
			"email": "root@mail.com"
		}
	});
	console.log("Home page accessed");
	return res.render('home', {
		homedescription: homedes.homedescription,
		homepolicy: homeimagepolicy.homepolicy,
		homeimage: homeimagepolicy.homeimage,
		homepolicyimage: homeimagepolicy.homepolicyimage,
		release_name1: "Ending in 2 days!",
		release_name2: "Coming Soon!",
		release_name3: "Out Now!",
		release_name4: "Out Now!"
	});
}

/**
 * Renders the edithomedes page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function edithomedescription_page(req, res) {
	console.log("Home Description page accessed");
	return res.render('edithomedescription');
};

/**
* Renders the login page
* @param {Request}  req Express Request handle
* @param {Response} res Express Response handle
*/
async function edithomedescription_process(req, res) {
	try {
		const homedes = await ModelHomeDescription.findOne({
			where: {
				"email": "root@mail.com"
			}
		});
		homedes.update({
			homedescription: req.body.homedescription
		});
		homedes.save();
		console.log('Description created: $(homedes.email)');
		return res.redirect("/");
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render("/edithomedes", { errors: errors });
		//return res.redirect(home_page, { errors: errors });
	}
}

/**
 * Renders the edithomedes page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function edithomeimagepolicy_page(req, res, next) {
	console.log("Home Policy page accessed");
	return res.render('edithomeimagepolicy', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function edithomeimagepolicy_process(req, res, next) {
	try {
		const file = req.file;
		//console.log(homeimage);
		// if (!file) {
		// 	const error = new Error("Please upload a file");
		// 	error.httpStatusCode = 400;
		// 	return next(error);
		//   }

		const homeimageFile = req.files.homeimage[0];
  		const homepolicyimageFile = req.files.homepolicyimage[0];
		
		const homeimagepolicy = await ModelHomeImagePolicy.findOne({
			where: {
				"email": "root@mail.com"
			}
		});
		homeimagepolicy.update({
			// req.body.homepolicy
			homepolicy: req.body.homepolicy,
			homeimage: homeimageFile.filename,
			homepolicyimage: homepolicyimageFile.filename
		});
		homeimagepolicy.save();
		// res.send(homeimagepath);
		// res.send(homepolicyimagepath);
		console.log('Description created: $(homeimagepolicy.email)');
		return res.redirect("/");
	}
	catch (error) {
		console.error(`File is uploaded but something crashed`);
		console.error(error);
		return res.render('edithomeimagepolicy', { 
			hey: "Wrong Type of File."
		});
	}
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function edithomebestreleases_page(req, res) {
	console.log("Home Best Releases page accessed");
	return res.render('editbestreleases', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function edithomebestreleases_process(req, res) {
	try {
		const homebestreleases = await ModelBestReleases.create({
			"email": req.body.email,
			"homeid": req.body.homeid,
			"release_image1": req.body.release_image1,
			"release_name1": req.body.release_name1,
			"release_image2": req.body.release_image2,
			"release_name2": req.body.release_name2,
			"release_image3": req.body.release_image3,
			"release_name3": req.body.release_name3,
			"release_image4": req.body.release_image4,
			"release_name4": req.body.release_name4
		});
		console.log('Description created: $(homebestreleases.email)');
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render('/edithomeimagepolicy', { errors: errors });
	}
}

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function prodlist_page(req, res) {
	const roomlist = await ModelRooms.findOne({
		where: {
			"email": "root@mail.com"
		}
	});
	const createmovies = await ModelMovies.findOne({
		where: {
			"email": "root@mail.com"
		}
	});
	const createsongs = await ModelSongs.findOne({
		where: {
			"email": "root@mail.com"
		}
	});
	console.log('Prodlist Page accessed');
	return res.render('prodlist', {
		room_title: roomlist.room_title,
		small_roominfo: roomlist.small_roominfo,
		small_roomprice: roomlist.small_roomprice,
		small_roomimage1: roomlist.small_roomimage1,
		small_roomimage2: roomlist.small_roomimage2,
		med_roominfo: roomlist.med_roominfo,
		med_roomprice: roomlist.med_roomprice,
		med_roomimage: roomlist.med_roomimage,
		large_roominfo: roomlist.large_roominfo,
		large_roomprice: roomlist.large_roomprice,
		large_roomimage1: roomlist.large_roomimage1,
		large_roomimage2: roomlist.large_roomimage2,
		movieimage: req.body.movieimage,
		moviename: "moviename",
		movieagerating: "movieagerating",
		movieduration: "movieduration",
		movieHorror: req.body.movieHorror,
		movieComedy: req.body.movieComedy,
		movieScience: req.body.movieScience,
		movieRomance: req.body.movieRomance,
		movieAnimation: req.body.movieAnimation,
		movieAdventure: req.body.movieAdventure,
		movieEmotional: req.body.movieEmotional,
		movieMystery: req.body.movieMystery,
		movieAction: req.body.movieAction,
		songimage: req.body.songimage,
		songname: "songname",
		songagerating: "songagerating",
		songduration: "songduration",
		songPop: req.body.songPop,
		songRock: req.body.songRock,
		songMetal: req.body.songMetal,
		songCountry: req.body.songCountry,
		songRap: req.body.songRap,
		songJazz: req.body.songJazz,
		songFolk: req.body.songFolk
	});
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function editrooms_page(req, res) {
	console.log("Prod List RoomsInfo page accessed");
	return res.render('editrooms', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function editrooms_process(req, res, next) {
	try {
		const small_roomimage1File = req.files.small_roomimage1[0];
		const small_roomimage2File = req.files.small_roomimage2[0];
		const med_roomimageFile    = req.files.med_roomimage[0];
		const large_roomimage1File = req.files.large_roomimage1[0];
		const large_roomimage2File = req.files.large_roomimage2[0];

		const roomlist = await ModelRooms.findOne({
			where: {
				"email": "root@mail.com"
			}
		});
		roomlist.update({
			"room_title": req.body.room_title,
			"small_roominfo": req.body.small_roominfo,
			"small_roomprice": req.body.small_roomprice,
			"small_roomimage1": small_roomimage1File.filename,
			"small_roomimage2": small_roomimage2File.filename,
			"med_roominfo": req.body.med_roominfo,
			"med_roomprice": req.body.med_roomprice,
			"med_roomimage": med_roomimageFile.filename,
			"large_roominfo": req.body.large_roominfo,
			"large_roomprice": req.body.large_roomprice,
			"large_roomimage1": large_roomimage1File.filename,
			"large_roomimage2": large_roomimage2File.filename
		})
		roomlist.save();
		console.log('Description created: $(roomlist.email)');
		return res.redirect("/prodlist");
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render('editrooms');
	}
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function chooseeditmoviesandsongs_page(req, res) {
	console.log("Prod List Choose Edit Movie/Songs page accessed");
	return res.render('choosemoviesandsongs', {

	});
};

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function createmovie_page(req, res) {
	console.log("Prod List Choose Edit Movie page accessed");
	return res.render('createmovies', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function createmovie_process(req, res) {
	try {
		const createmovies = await ModelMovies.create({
			"email": req.body.email,
			"prodlistid": req.body.prodlistid,
			"choosemovieid": req.body.choosemovieid,
			"movieimage": req.body.movieimage,
			"moviename": req.body.moviename,
			"movieagerating": req.body.movieagerating,
			"movieduration": req.body.movieduration,

			"movieHorror": req.body.movieHorror,
			"movieComedy": req.body.movieComedy,
			"movieScience": req.body.movieScience,
			"movieRomance": req.body.movieRomance,
			"movieAnimation": req.body.movieAnimation,
			"movieAdventure": req.body.movieAdventure,
			"movieEmotional": req.body.movieEmotional,
			"movieMystery": req.body.movieMystery,
			"movieAction": req.body.movieAction
		});
		console.log('Description created: $(createmovies.email)');
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render('home', { errors: errors });
	}
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function editmovie_page(req, res) {
	console.log("Prod List Edit Movie page accessed");
	return res.render('updatemovies', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function editmovie_process(req, res) {
	try {
		const editmovies = await ModelMovies.create({
			"email": req.body.email,
			"prodlistid": req.body.prodlistid,
			"choosemovieid": req.body.choosemovieid,
			"movieimage": req.body.movieimage,
			"moviename": req.body.moviename,
			"movieagerating": req.body.movieagerating,
			"movieduration": req.body.movieduration,

			"movieHorror": req.body.movieHorror,
			"movieComedy": req.body.movieComedy,
			"movieScience": req.body.movieScience,
			"movieRomance": req.body.movieRomance,
			"movieAnimation": req.body.movieAnimation,
			"movieAdventure": req.body.movieAdventure,
			"movieEmotional": req.body.movieEmotional,
			"movieMystery": req.body.movieMystery,
			"movieAction": req.body.movieAction
		});
		console.log('Description created: $(editmovies.email)');
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render('home', { errors: errors });
	}
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function createsong_page(req, res) {
	console.log("Prod List Create Songs page accessed");
	return res.render('createsongs', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function createsong_process(req, res) {
	try {
		const createsongs = await ModelSongs.create({
			"email": req.body.email,
			"prodlistid": req.body.prodlistid,
			"choosekaraokeid": req.body.choosekaraokeid,

			"songimage": req.body.songimage,
			"songname": req.body.songname,
			"songagerating": req.body.songagerating,
			"songduration": req.body.songduration,

			"songPop": req.body.songPop,
			"songRock": req.body.songRock,
			"songMetal": req.body.songMetal,
			"songCountry": req.body.songCountry,
			"songRap": req.body.songRap,
			"songJazz": req.body.songJazz,
			"songFolk": req.body.songFolk
		});
		console.log('Description created: $(createsongs.email)');
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render('home', { errors: errors });
	}
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function editsong_page(req, res) {
	console.log("Prod List Edit Songs page accessed");
	return res.render('updatesongs', {

	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function editsong_process(req, res) {
	try {
		const editsong = await ModelSongs.create({
			"email": req.body.email,
			"prodlistid": req.body.prodlistid,
			"choosekaraokeid": req.body.choosekaraokeid,

			"songimage": req.body.songimage,
			"songname": req.body.songname,
			"songagerating": req.body.songagerating,
			"songduration": req.body.songduration,

			"songPop": req.body.songPop,
			"songRock": req.body.songRock,
			"songMetal": req.body.songMetal,
			"songCountry": req.body.songCountry,
			"songRap": req.body.songRap,
			"songElectronic": req.body.songElectronic,
			"songJazz": req.body.songJazz,
			"songFolk": req.body.songFolk
		});
		console.log('Description created: $(editsong.email)');
	}
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		return res.render('home', { errors: errors });
	}
}

/**
 * Renders the edithomebestreleases page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function businessstatistics_page (req, res) {
	console.log("Business Statistics page accessed");
	return res.render('businessstatistics', {
		
	});
};

//Nigel's
// ---------------- 
//	TODO: Attach additional routers here
import RouterAuth from './auth.mjs';
import RouterReview from './review.mjs';
import Routerfaq from './faq.mjs';
router.use("/auth", RouterAuth);
router.use("/review", RouterReview);
router.use("/faq", Routerfaq);

router.get("/", async function (req, res) {
	return res.redirect("/home");
});
// ---------------- 
//	TODO:	Common URL paths here
router.get("/home",      async function(req, res) {
	console.log("Home page accessed");
	return res.render('index', {
		title: "Hello"
	});
});
router.post("/create", async function (req, res) {
	const roomlist = await ModelReview.create({
		"rating"  			: req.body.Rating,
		"feedback"		: req.body.feedback,
	});
	console.log("review contents received");
	console.log(roomlist);
	return res.redirect("/home");
});

router.post("/faq", async function (req, res) {
	console.log("faq contents received");
	console.log(req.body);
	const Faq = await ModelFaq.create({
		"questions"  			: req.body.questions[0],
		"answers"		: req.body.answers[0],
		
	});
	console.log("Faq contents received");
	console.log(Faq);

	let errors = [];
	//	Check your Form contents
	//	Basic IF ELSE STUFF no excuse not to be able to do this alone
	//	Common Sense
	if (errors.length > 0) {
		flashMessage(res, 'error', 'Invalid review!', 'fas fa-sign-in-alt', true);
		return res.redirect(req.originalUrl);
	}
	else {
		flashMessage(res, 'success', 'Successfully created a review!', 'fas fa-sign-in-alt', true);
		return res.redirect("/home");
	}
});

//Saran's
import { Router }       from 'express';
import { Modelbooked} from '../data/choice.mjs';
import { ModelCheckout} from '../data/checkout.mjs';
import { Modeldate } from '../data/update_date.mjs';
import { Modellocation } from '../data/update_location.mjs';
import { Modelchoice } from '../data/update_choice.mjs';
import { ModelRoomtype } from '../data/roomtype.mjs';

const router = Router();
export default router;

// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`./dynamic/${req.params.path}`)
});
router.post("/booking", booking_process);
router.get("/booking",  booking_page);
router.post("/roomtype", roomtype_process);
router.get("/roomtype",  roomtype_page);

router.post("/checkout", checkout_process);
router.get("/checkout",  checkout_page);


router.post("/update_choice", update_choice_process);
router.get("/update_choice",  update_choice_page);

// booking page
var room_details = {location: '', date: '', time: '', choice:'', uuid: '', roomtype:''};
async function booking_process(req, res) {
		console.log('Description created: $(booking.choice)');
	try {
		console.log(req.body.time);
		const roomtype = await ModelRoomtype.findOne({ where: { time: req.body.time, location: req.body.location, date: req.body.date} });
		console.log(roomtype);
		if (roomtype === null) {
				console.log('Not found!');
			const room = await ModelRoomtype.create({
				time: req.body.time, 
				location: req.body.location, 
				date: req.body.date,
				small: 5,
				medium:5,
				big:5
			});
		 } 
		
		else {
		console.log(roomtype.uuid);
		}
		room_details = { location: req.body.location, date: req.body.date, time: req.body.time, choice: req.body.choice, uuid:roomtype.uuid};
		return res.redirect("/roomtype");
		
	}
	catch (error) {
		console.error(error);
	}
}

async function booking_page(req, res) {
		console.log("booking page accessed");
		const choice = await Modelchoice.findOne({
		where: {
				"uuid": "00000000-0000-0000-0000-000000000011"
		}
	});
		return res.render('booking',{choice
		});

}
async function roomtype_process(req, res) {
	console.log(req.body.roomtype);
	const roomtype = await ModelRoomtype.findOne({
		where: {
			time: room_details.time, location: room_details.location, date: room_details.date
		}
	});
	room_details.roomtype = req.body.roomtype;
	console.log(req.body.roomtype);
	if(req.body.roomtype == 'Small'){
		console.log('Small - 1');
		roomtype.update({
			small: roomtype.small - 1
		});
		roomtype.save();
	}
	else if ( req.body.roomtype == 'Medium'){
		console.log('Medium - 1');
		roomtype.update({
			medium: roomtype.medium - 1
		});
		roomtype.save();
	}
	else if(req.body.roomtype == 'Big'){
		console.log('Big - 1');
		roomtype.update({
			big: roomtype.big - 1
		});
		roomtype.save();
	}
	return res.redirect("/checkout");
}
async function roomtype_page(req, res) {
	console.log("Choosing roomtype page accessed");
	console.log(room_details);
	const roomtype = await ModelRoomtype.findOne({
		where: {
			time: room_details.time, location: room_details.location, date: room_details.date
		}
	});
	return res.render('roomtype', {room_details, roomtype
	});
}	   
// ---------------------------------------
// checkout page
async function checkout_process(req, res) {
	try {
		const [user, created] = await ModelCheckout.findOrCreate({
			where: { username: "nigel_123" },
			defaults: {
				username: "nigel_123",
				card_number: req.body.card_number,
				card_holder: req.body.card_holder,
				expiry_month: req.body.expiry_month,
				expiry_year: req.body.expiry_year,
				ccv: req.body.cvv,
			}
		});
		console.log(user.uuid); // 'sdepold'
		console.log(user.card_number); // This may or may not be 'Technical Lead JavaScript'
		console.log(created); // The boolean indicating whether this instance was just created
		if (created == false) {
			console.log(req.body); // This will certainly be 'Technical Lead JavaScript'
		}
		return res.redirect("/after_booking");
	}	
	catch (error) {
		console.error(error);
	}
}
async function checkout_page(req, res) {
		console.log("checkout page accessed");
	const card_details = await ModelCheckout.findOne({
		where: {
			username: "nigel_123"
		}
	});
		return res.render('checkout',{
			card_details
		});
	}

//  update choice page
async function update_choice_process(req, res) {
	try {
		const [user, created] = await Modelchoice.findOrCreate({
			where: { uuid : "00000000-0000-0000-0000-000000000011" },
			defaults: {
					time1: req.body.time1,
					time2: req.body.time2,
					time3: req.body.time3,
					time4: req.body.time4,
					time5: req.body.time5,
					location1: req.body.location1,
					location2: req.body.location2,
					location3: req.body.location3,
					location4: req.body.location4,
					location5: req.body.location5,
					date1: req.body.date1,
					date2: req.body.date2,
					date3: req.body.date3,
					date4: req.body.date4,
					date5: req.body.date5
				}
		});
		console.log(user.uuid); // 'sdepold'
		console.log(user.time1); // This may or may not be 'Technical Lead JavaScript'
		console.log(created); // The boolean indicating whether this instance was just created
		if (created == false) {
			console.log(req.body); // This will certainly be 'Technical Lead JavaScript'
			const choice = await Modelchoice.findOne({
				where: {
					"uuid": "00000000-0000-0000-0000-000000000011"
				}
			});
			choice.update({
				time1: req.body.time1,
				time2: req.body.time2,
				time3: req.body.time3,
				time4: req.body.time4,
				time5: req.body.time5,
				location1: req.body.location1,
				location2: req.body.location2,
				location3: req.body.location3,
				location4: req.body.location4,
				location5: req.body.location5,
				date1: req.body.date1,
				date2: req.body.date2,
				date3: req.body.date3,
				date4: req.body.date4,
				date5: req.body.date5
			});
			choice.save();
		}
		return res.redirect("/home");
	}
	catch (error) {
		console.error(error);
	}
		}	
async function update_choice_page(req, res) {
				console.log("update choice page accessed");
				const choice = await Modelchoice.findOne({
		where: {
			uuid: "00000000-0000-0000-0000-000000000011"
		}
	});
	return res.render('admin/choice', {
		choice
	});
			}
router.get("/after_booking", async function (req, res) {
	console.log("after booking page accessed");
	console.log(room_details);
	return res.render('after_booking', {
		room_details
	});
});
router.get("/review",      (req, res) => {
	console.log("Home page accessed");
	return res.render('review', {
	});
});
router.get("/ticket",     function(req, res) {
	console.log("Home page accessed");
	return res.render('view', {

	});
});
router.get("/ticketlist/tickettable", tickettable);
router.get("/ticketlist/tickettable-data", tickettable_data);
async function tickettable(req, res) {
	return res.render('tickets');
}
async function tickettable_data(req, res) {
	const ticket = await Modelticket.findAll({ raw: true });
	return res.json({
		"total": ticket.length,
		"rows": ticket
	});
}
router.get("/view/:uuid", async function (req, res, next) {
	const tid = req.params.uuid;
	console.log("ticket page accessed");
	try {
		if (tid == undefined) {
			throw new HttpError(400, "Target user id is invalid");
		}
		const target_user = await Modelticket.findOne({
			where: {
				uuid: tid
			}
		});
		if (target_user == null) {
			throw new HttpError(410, "User doesn't exists");
		}
		console.log(target_user);
			return res.render("view", {
				target: target_user
			});
	}
	catch (error) {
		console.error(`Invalid request: ${tid}`);
		error.code = (error.code == undefined) ? 500 : error.code;
		console.log(error);
		return next(error);
	}
});
import payment from '../routes/payment.mjs';
router.use("/payment", payment );
router.get("/paymentOption", async function (req, res) {
	console.log("Choosing payment method");
	return res.render('PaymentOption');
});
