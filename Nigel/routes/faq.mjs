import { Router }       from 'express';
import {ModelFaq} from '../data/faq.mjs';
import { flashMessage } from '../utils/flashmsg.mjs'
const router = Router();
export default router;

router.get("/faq",      async function(req, res) {
	console.log("faq page accessed");
	return res.render('createfaq');
});

router.post("/faq", async function (req, res) {
	console.log("faq contents received");
	console.log(req.body);

	let errors = [];
	//	Check your Form contents
	//	Basic IF ELSE STUFF no excuse not to be able to do this alone
	//	Common Sense
	if (errors.length > 0) {
		flashMessage(res, 'error', 'Invalid review!', 'fas fa-sign-in-alt', true);
		return res.redirect(req.originalUrl);
	}
	else {
		flashMessage(res, 'success', 'Successfully created an faq!', 'fas fa-sign-in-alt', true);
		return res.redirect("/home");
	}
});
