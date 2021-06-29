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






