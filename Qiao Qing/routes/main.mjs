import { Router }       from 'express';
import { flashMessage } from '../utils/flashmsg.mjs'
import { ModelHomeDescription } from '../data/homedescription.mjs';
import { ModelHomeImagePolicy } from '../data/homeimagepolicy.mjs';
import { ModelBestReleases } from '../data/homebestreleases.mjs';
import { ModelRooms } from '../data/rooms.mjs';
import { ModelMovies } from '../data/movies.mjs';
import { ModelSongs } from '../data/karaoke.mjs';

const router = Router();
export default router;

// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`./dynamic/${req.params.path}`)
});

// ---------------- 
//	TODO: Attach additional routers here
import RouterAuth from './auth.mjs'
router.use("/auth", RouterAuth);

router.get("/"  , home_page);
router.get("/edithomedes"  ,edithomedescription_page);
router.post("/edithomedes" ,edithomedescription_process);
router.get("/edithomeimagepolicy"  ,edithomeimagepolicy_page);
router.post("/edithomeimagepolicy" ,edithomeimagepolicy_process);
router.get("/edithomebestreleases" ,edithomebestreleases_page);
router.post("/edithomebestreleases",edithomebestreleases_process);


router.get("/prodlist" 				,prodlist_page);
router.get("/prodlist/editroominfo"	,editrooms_page);
router.post("/prodlist/editroominfo",editrooms_process);

router.get("/prodlist/chooseeditmoviesandsongs",chooseeditmoviesandsongs_page);

router.get("/prodlist/editmovie"		 ,editmovie_page);
router.post("/prodlist/editmovie"		 ,editmovie_process);
router.get("/prodlist/editsong"			 ,editsong_page);
router.post("/prodlist/editsong"		 ,editsong_process);
router.get("/prodlist/createmovie"		 ,createmovie_page);
router.post("/prodlist/createmovie"		 ,createmovie_process);
router.get("/prodlist/createsong"		 ,createsong_page);
router.post("/prodlist/createsong"		 ,createsong_process);


/**
 * Renders the home page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function home_page(req, res) {
	console.log("Home page accessed");
	return res.render('home', {
		homedescription: "Welcome to Golden TV, where we combine the two together to give you the most wonderous experience you seek within safe areas where you can get to enjoy your time with your loved ones!",
		homepolicy: "Our No Smoking, No Frills policies are to promote healthy and green karaoke culture among",
		release_name1: "1",
		release_name2: "2",
		release_name3: "3",
		release_name4: "4"
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
		const homedes = await ModelHomeDescription.create({
			"email" : req.body.email,
			"homeid" : req.body.homeid,
			"homedescription": req.body.homedescription
		});
		console.log('Description created: $(homedes.email)');
		return res.redirect("/prodlist", { errors: errors });
	}	
	catch (error) {
		console.error(`Credentials problem: ${req.body.email}`);
		console.error(error);
		//return res.render(home_page, { errors: errors });
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
async function edithomeimagepolicy_page(req, res) {
	console.log("Home Policy page accessed");
	return res.render('edithomeimagepolicy', {
		
	});
};

/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
 async function edithomeimagepolicy_process(req, res) {
try {
	const homeimagepolicy = await ModelHomeImagePolicy.create({
		"email"  	: req.body.email,
		"homeid"	: req.body.homeid,
		"homepolicy": req.body.homepolicy,
		"homeimage": req.body.homeimage,
		"homepolicyimage" : req.body.homepolicyimage
	});
	console.log('Description created: $(homeimagepolicy.email)');
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
		const  homebestreleases = await  ModelBestReleases.create({
			"email"  	: req.body.email,
			"homeid"	: req.body.homeid,
			"release_image1" : req.body.release_image1,
            "release_name1" : req.body.release_name1,
            "release_image2" : req.body.release_image2,
            "release_name2" : req.body.release_name2,
            "release_image3" : req.body.release_image3,
            "release_name3" : req.body.release_name3,
            "release_image4" : req.body.release_image4,
            "release_name4" : req.body.release_name4
		});
		console.log('Description created: $(homebestreleases.email)');
	}		
		catch (error) {
			console.error(`Credentials problem: ${req.body.email}`);
			console.error(error);
			return res.render('home', { errors: errors });
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
		console.log("Product List page accessed");
		return res.render('prodlist');
	};

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
 async function editrooms_process(req, res) {
	try {
		const roomlist = await ModelRooms.create({
			"email"  			: req.body.email,
			"prodlistid"		: req.body.prodlistid,
            "room_title" 		: req.body.room_title,
            "small_roominfo" 	: req.body.small_roominfo,
            "small_roomprice" 	: req.body.small_roomprice,
            "small_roomimage1"	: req.body.small_roomimage1,
            "small_roomimage2"	: req.body.small_roomimage2,

            "med_roominfo" 		: req.body.med_roominfo,
            "med_roomprice" 	: req.body.med_roomprice,
            "med_roomimage" 	: req.body.med_roomimage,

            "large_roominfo" 	: req.body.large_roominfo,
            "large_roomprice" 	: req.body.large_roomprice,
            "large_roomimage1"	: req.body.large_roomimage1,
            "large_roomimage2"	: req.body.large_roomimage2
		});
		console.log('Description created: $(roomlist.email)');
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
			"email"  		: req.body.email,
			"prodlistid"	: req.body.prodlistid,
            "choosemovieid" : req.body.choosemovieid,
            "movieimage" 	: req.body.movieimage,
            "moviename" 	: req.body.moviename,
            "movieagerating": req.body.movieagerating,
            "movieduration" : req.body.movieduration,

            "movieHorror" 	: req.body.movieHorror,
            "movieComedy" 	: req.body.movieComedy,
            "movieScience" 	: req.body.movieScience,
            "movieRomance" 	: req.body.movieRomance,
            "movieAnimation": req.body.movieAnimation,
            "movieAdventure": req.body.movieAdventure,
            "movieEmotional": req.body.movieEmotional,
            "movieMystery" 	: req.body.movieMystery,
            "movieAction" 	: req.body.movieAction
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
			"email"  		: req.body.email,
			"prodlistid"	: req.body.prodlistid,
            "choosemovieid" : req.body.choosemovieid,
            "movieimage" 	: req.body.movieimage,
            "moviename" 	: req.body.moviename,
            "movieagerating": req.body.movieagerating,
            "movieduration" : req.body.movieduration,

            "movieHorror" 	: req.body.movieHorror,
            "movieComedy" 	: req.body.movieComedy,
            "movieScience" 	: req.body.movieScience,
            "movieRomance" 	: req.body.movieRomance,
            "movieAnimation": req.body.movieAnimation,
            "movieAdventure": req.body.movieAdventure,
            "movieEmotional": req.body.movieEmotional,
            "movieMystery" 	: req.body.movieMystery,
            "movieAction" 	: req.body.movieAction
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
			"email"  			: req.body.email,
			"prodlistid"		: req.body.prodlistid,
            "choosekaraokeid" 	: req.body.choosekaraokeid,

            "songimage" 		: req.body.songimage,
            "songname" 			: req.body.songname,
            "songagerating"		: req.body.songagerating,
            "songduration" 		: req.body.songduration,

            "songPop" 			: req.body.songPop,
            "songRock" 			: req.body.songRock,
            "songMetal" 		: req.body.songMetal,
            "songCountry" 		: req.body.songCountry,
            "songRap"			: req.body.songRap,
            "songJazz"			: req.body.songJazz,
            "songFolk" 			: req.body.songFolk
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
			"email"  			: req.body.email,
			"prodlistid"		: req.body.prodlistid,
            "choosekaraokeid" 	: req.body.choosekaraokeid,

            "songimage" 		: req.body.songimage,
            "songname" 			: req.body.songname,
            "songagerating"		: req.body.songagerating,
            "songduration" 		: req.body.songduration,

            "songPop" 			: req.body.songPop,
            "songRock" 			: req.body.songRock,
            "songMetal" 		: req.body.songMetal,
            "songCountry" 		: req.body.songCountry,
            "songRap"			: req.body.songRap,
            "songElectronic"	: req.body.songElectronic,
            "songJazz"			: req.body.songJazz,
            "songFolk" 			: req.body.songFolk
		});
		console.log('Description created: $(editsong.email)');
	}		
		catch (error) {
			console.error(`Credentials problem: ${req.body.email}`);
			console.error(error);
			return res.render('home', { errors: errors });
		}
	}

router.get("/about", async function(req, res) {
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
