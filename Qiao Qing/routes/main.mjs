import { Router } from 'express';
import { flashMessage } from '../utils/flashmsg.mjs'
// import { upload } from '../utils/multer.mjs'
// import { UploadFile, UploadTo, DeleteFile, DeleteFilePath } from '../utils/multer.mjs';
// import axios from 'axios';
import { ModelHomeDescription } from '../data/homedescription.mjs';
import { ModelHomeImagePolicy } from '../data/homeimagepolicy.mjs';
import { ModelBestReleases } from '../data/homebestreleases.mjs';
import { ModelRooms } from '../data/rooms.mjs';
import { ModelMovies } from '../data/movies.mjs';
import { ModelSongs } from '../data/karaoke.mjs';
// import Passport from 'passport';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';

const router = Router();
export default router;

// // upload file path
// const FILE_PATH = 'uploads';

// // configure multer
// const upload = multer({
//     dest: `${FILE_PATH}/`
// });

/**
 * @param database {ORM.Sequelize}
 */
export function initialize_models(database) {
	try {
		console.log("Intitializing ORM models");
		//	Initialzie models
		ModelUser.initialize(database);
		ModelHomeDescription.initialize(database);
		ModelHomeImagePolicy.initialize(database);
		ModelBestReleases.initialize(database);
		ModelRooms.initialize(database);
		ModelMovies.initialize(database);
		ModelSongs.initialize(database);

		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc

		console.log("Adding intitialization hooks");
		//	Run once hooks during initialization 
		database.addHook("afterBulkSync", generate_root_account.name, generate_root_account.bind(this, database));
		database.addHook("afterBulkSync", generate_homedescription.email, generate_homedescription.bind(this, database));
		database.addHook("afterBulkSync", generate_homeimagepolicy.email, generate_homeimagepolicy.bind(this, database));
		database.addHook("afterBulkSync", generate_bestreleases.email, generate_bestreleases.bind(this, database));
		database.addHook("afterBulkSync", generate_rooms.email, generate_rooms.bind(this, database));
		database.addHook("afterBulkSync", generate_movies.email, generate_movies.bind(this, database));
		database.addHook("afterBulkSync", generate_songs.email, generate_songs.bind(this, database));
	}
	catch (error) {
		console.error("Failed to configure ORM models");
		console.error(error);
	}
}

// ---------------- 
//	TODO: Attach additional routers here
import RouterAuth from './auth.mjs'
router.use("/auth", RouterAuth);

// // Body parser middleware to parse HTTP body to read post data
// router.use(bodyParser.urlencoded({extended: false}));
// router.use(bodyParser.json());

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

// const uploadMultiple = upload.fields([
// 	    { name: 'homeimage', maxCount: 1 },
// 	    { name: 'homepolicyimage', maxCount: 1 },
// 	  ])

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

router.get("/about", async function (req, res) {
	console.log("About page accessed");
	return res.render('about', {
		author: "The awesome programmer",
		values: [1, 2, 3, 4, 5, 6]
	});
});

router.get('/about', (req, res) => {
	const author = 'Denzel Washington';
	let success_msg = 'Success message';
	let error_msg = 'Error message using error_msg';
	res.render('about', {
		author: author,
		success_msg: success_msg,
		error_msg: error_msg
	})
});

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
