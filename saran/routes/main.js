import { Router }       from 'express';


const router = Router();
export default router;

// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`./dynamic/${req.params.path}`)
});

// ---------------- 
//	TODO: Attach additional routers here
// import RouterAuth  from './auth.mjs';
// import RouterAdmin from './admin/admin.mjs';
// router.use("/auth",  RouterAuth);
// router.use("/admin", RouterAdmin);


router.get("/", async function (req, res) {
	return res.redirect("/booking");
});

//	TODO:	Common URL paths here
router.get("/booking",   (req, res) => {
	console.log("Home page accessed");
	return res.render('booking', {
	});
});
router.post("/roomtype",  (req, res) => {
	console.log("Home page accessed");
	return res.render('roomtype', {

	});
});
router.get("/checkout",     (req, res) =>{
	console.log("Home page accessed");
	return res.render('checkout', {

	});
});
router.get("/review",      (req, res) => {
	console.log("Home page accessed");
	return res.render('review', {

	});
});
router.post("/ticket",      function(req, res) {
	console.log("Home page accessed");
	return res.render('ticket', {

	});
});