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


router.get("/faq", async function(req,res) {
	console.log("Faq page accessed");
	return res.render('faq', {

	});
});


router.get("/review",  function(req, res) {
	console.log("Customer review page accessed");
	return res.render('review', {
	});
});
