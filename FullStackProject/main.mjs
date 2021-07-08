import { Router }       from 'express';
import { flashMessage } from '../utils/flashmsg.mjs';
import { ModelReview } from '../data/review.mjs';
import {ModelFaq} from '../data/faq.mjs';
const router = Router();
export default router;
import ORM from 'sequelize';
const {Sequelize, DataTypes, Model, Op} = ORM;
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
router.get ("/retrievefaq",       view_faqpage);
//router.get ("/retrievefaq-data",  template_retrievefaq_data);


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

router.get("/contactus",      async function(req, res) {
	console.log("Contact Us page accessed");
	return res.render("contactus", {
		
	});
});

router.post("/contactus", async function (req, res) {
	console.log("contactus contents received");
	console.log(req.body);

});

router.post("/create", async function (req, res) {
	const roomlist = await ModelReview.create({
		"rating"  			: req.body.Rating,
		"feedback"		: req.body.feedback,
	});
	console.log("review contents received");
	console.log(roomlist);
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

router.post("/faq", async function (req, res) {
	console.log("faq contents received");
	console.log(req.body);
	const Faq = await ModelFaq.create({
		"questions"  			: req.body.questions,
		"answers"		: req.body.answers,
	});
	console.log("Faq contents received");
	console.log(Faq);
	let errors = [];
	//	Check your Form contents
	//	Basic IF ELSE STUFF no excuse not to be able to do this alone
	//	Common Sense
	if (errors.length > 0) {
		flashMessage(res, 'error', 'Invalid faq!', 'fas fa-sign-in-alt', true);
		return res.redirect(req.originalUrl);
	}
	else {
		flashMessage(res, 'success', 'Successfully created a faq!', 'fas fa-sign-in-alt', true);
		return res.redirect("/retrievefaq");
	}

});


router.get("/faq", async function faq(req, res) {
	// res.sendFile("dynamic/uploads/{{ }}");
	const homedes = await ModelFaq.findOne({
		where: {
			"questions": "Is this good?"
		}
	});
	console.log("Home page accessed");
	return res.render('home', {
		homedescription: homedes.homedescription,
	                   
		questions: "Ending in 2 days!",
		answers: "Coming Soon!",
	
	});

});

async function template_retrievefaq(req, res) {
	return res.render("retrievefaq");

};
async function view_faqpage(req,res){
	const faq = await ModelFaq.findAll({
		where:{
			"questions":{
				[Op.ne]: "null"
			}
		}
	});
	return res.render('retrievefaq',{faq:faq} )
}

router.get("/table",async function(req, res) {
	console.log("table contents received")
	console.log(req.body);
});
router.get("/table-data",async function(req, res){
	console.log("table-data contents received")
	console.log(req.body);
});
router.get("/updatefaq/:questions",async function(req, res){
	console.log("Update Faq rendered")
	return res.render("updatefaq",{questions:req.params.questions})
});
router.post("/updatefaq/:questions", async function (req, res) {
	console.log("update faq contents received");
	console.log(req.body);
	const Faq = await ModelFaq.update({
		"answers"		: req.body.answers,
	},{
		where:{
			questions : req.params.questions
		}
	});

	console.log("Faq contents received");
	console.log(Faq);
	let errors = [];
	//	Check your Form contents
	//	Basic IF ELSE STUFF no excuse not to be able to do this alone
	//	Common Sense
	if (errors.length > 0) {
		flashMessage(res, 'error', 'Invalid faq!', 'fas fa-sign-in-alt', true);
		return res.redirect(req.originalUrl);
	}
	else {
		flashMessage(res, 'success', 'Successfully updated a faq!', 'fas fa-sign-in-alt', true);
		return res.redirect("/retrievefaq");
	}
});
router.get("/deletefaq/:questions", async function (req, res){
	console.log("contents deleted")
	console.log(req.body);
	ModelFaq.findOne({
		where: {
			questions : req.params.questions
		},
	}).then((dfaq)=>{
		if (dfaq != null){
		ModelFaq.destroy({
			where:{
				questions:req.params.questions
			}
			
		})
		return res.redirect("/retrievefaq");
	}
	
});
});
router.get("/testout",      async function(req, res) {
	console.log("Index page accessed");
	return res.render("testout", {
		
	});
});

router.post("/testout", async function (req, res) {
	console.log("Index contents received");
	console.log(req.body);

});
