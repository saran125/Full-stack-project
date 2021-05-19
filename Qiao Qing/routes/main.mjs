import { Router }       from 'express';
import { flashMessage } from '../utils/flashmsg.mjs'
import { ModelHomeDescription } from '../data/homedescription.mjs';

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

router.get("/", home_page);
router.post("/", home_process);
/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
// ---------------- 
//	TODO:	Common URL paths here
async function home_page(req, res) {
	console.log("Home page accessed");
		//	Create homedescrip
	return res.render('home', {
		homedescription: "Welcome to Golden TV, where we combine the two together to give you the most wonderous experience you seek within safe areas where you can get to enjoy your time with your loved ones!",
		homepolicy: "Our No Smoking, No Frills policies are to promote healthy and green karaoke culture among",
		release_name1: "ehhh",
		release_name2: "2",
		release_name3: "3",
		release_name4: "4"
	});
}
/**
 * Renders the login page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function home_process(req, res) {
	try {
		const user = await ModelHomeDescription.create({
			"email" : "req.body.email",
			"homedescription": "homedescription"
		});
	console.log('Description created: $(user.uuid)');
	}

	catch (error) {
		console.error(`Credentials problem: ${req.body.email} ${req.body.password}`);
		console.error(error);
		return res.render('auth/login', { errors: errors });
	}
}

router.get("/edithomedes", async function(req, res) {
	console.log("Home Description page accessed");
	return res.render('edithomedescription');
});

router.get("/edithomeimagepolicy", async function(req, res) {
	console.log("Home Policy page accessed");
	return res.render('edithomeimagepolicy');
});

router.get("/editbestreleases", async function(req, res) {
	console.log("Best Releases page accessed");
	return res.render('editbestreleases');
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

router.get("/editrooms", async function(req, res) {
	console.log("Rooms page accessed");
	return res.render('editrooms');
});

router.get("/choosemoviesandsongs", async function(req, res) {
	console.log("Choose Movies and Songs page accessed");
	return res.render('choosemoviesandsongs');
});

router.get("/createmovies", async function(req, res) {
	console.log("Create Movies page accessed");
	return res.render('createmovies');
});

router.get("/updatemovies", async function(req, res) {
	console.log("Update Movies page accessed");
	return res.render('updatemovies');
});

router.get("/createsongs", async function(req, res) {
	console.log("Create Songs page accessed");
	return res.render('createsongs');
});

router.get("/updatesongs", async function(req, res) {
	console.log("Update Songs page accessed");
	return res.render('updatesongs');
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