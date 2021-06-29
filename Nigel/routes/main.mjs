import { Router }       from 'express';
import { flashMessage } from '../utils/flashmsg.mjs';
import { ModelReview } from '../data/review.mjs';
import {ModelFaq} from '../data/faq.mjs';
const router = Router();
export default router;
// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`./dynamic/${req.params.path}`)
});

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





