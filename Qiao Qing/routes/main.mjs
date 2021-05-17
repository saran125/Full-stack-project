import { Router }       from 'express';
import { flashMessage } from '../utils/flashmsg.mjs'

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


// ---------------- 
//	TODO:	Common URL paths here
router.get("/",      async function(req, res) {
	console.log("Home page accessed");
	return res.render('home', {
		homedescription: "Welcome to Golden TV, where we combine the two together to give you the most wonderous experience you seek within safe areas where you can get to enjoy your time with your loved ones!",
		homepolicy: "Our No Smoking, No Frills policies are to promote healthy and green karaoke culture among",
		release_name1: "ehhh",
		release_name2: "2",
		release_name3: "3",
		release_name4: "4"
	});
});

router.get("/movies",      async function(req, res) {
	console.log("Home page accessed");
	return res.render('movies', {
		roomtitle: "Hello Today",
		small_roominfo: "sup",
		small_roomprice: "ehhh",
		med_roominfo: "m",
		med_roomprice: "m",
		large_roominfo: "l",
		large_roomprice: "l",
		movieadded1: "movies added1",
		movieadded2: "movies added2",
		songadded1: "song added1",
		songadded2: "song added2",

	});
});

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
	