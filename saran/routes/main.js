import { Router }       from 'express';
import { Modelbooked} from '../data/choice.mjs';
import { ModelCheckout} from '../data/checkout.mjs';
import { Modeldate } from '../data/update_date.mjs';
import { Modeltime } from '../data/update_time.mjs';
import { Modellocation } from '../data/update_location.mjs';


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
	return res.redirect("/home");
});
//	TODO:	Common URL paths here
router.get("/home",      async function(req, res) {
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
router.post("/home",      async function(req, res) {
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
		moviename: "moviename",
		movieagerating: "movieagerating",
		movieduration: "movieduration"
	});
});
router.post("/booking", booking_process);
router.get("/booking",  booking_page);
router.post("/checkout", checkout_process);
router.get("/checkout",  checkout_page);
router.post("/update_date", update_date_process);
router.get("/update_date",  update_date_page);
router.post("/update_time", update_time_process);
router.get("/update_time",  update_time_page);
router.post("/update_location", update_location_process);
router.get("/update_location",  update_location_page);
// booking page
async function booking_process(req, res) {
	
		console.log('Description created: $(booking.choice)');
		return res.redirect("/checkout");
	
	
}

async function booking_page(req, res) {
		console.log("booking page accessed");
		return res.render('booking');
	}
	
// ---------------------------------------
router.post("/roomtype",  (req, res) => {
	console.log("Home page accessed");
	return res.render('roomtype', {

	});
});
// checkout page
async function checkout_process(req, res) {
	try {
		const checkout = await ModelCheckout.create({
			card_number: req.body.card_number,
			card_holder: req.body.card_holder,
			expiry_month: req.body.expiry_month,
			expiry_year: req.body.expiry_year,
			ccv: req.body.cvv,
			
		});
		return res.redirect("/tickets");
	}	
	catch (error) {
		console.error(error);
		//return res.render(home_page, { errors: errors });
		//return res.redirect(home_page, { errors: errors });
	}
}
async function checkout_page(req, res) {
		console.log("checkout page accessed");
		return res.render('checkout');
	}
// update_date page
async function update_date_process(req, res) {
		try {
			const date = await Modeldate.create({
				date1: req.body.date1,
				date2: req.body.date2,
				date3: req.body.date3,
				date4: req.body.date4,
				date5: req.body.date5,
				
			});
			return res.redirect("/home");
		}	
		catch (error) {
			console.error(error);
			//return res.render(home_page, { errors: errors });
			//return res.redirect(home_page, { errors: errors });
		}
	}
	
async function update_date_page(req, res) {
			console.log("update date page accessed");
			return res.render('admin/date');
		}
//  update time page
async function update_time_process(req, res) {
			try {
				const time = await Modeltime.create({
				time1: req.body.time1,
				time2 : req.body.time2,
				time3 : req.body.time3,
				time4 : req.body.time4,
				time5 : req.body.time5,
				
				});
				return res.redirect("/home");
			}	
			catch (error) {
				console.error(error);
				//return res.render(home_page, { errors: errors });
				//return res.redirect(home_page, { errors: errors });
			}
		}
		
async function update_time_page(req, res) {
				console.log("update time page accessed");
				return res.render('admin/time');
			}

// update location page
async function update_location_process(req, res) {
				try {
					const location = await Modellocation.create({
						location1: req.body.location1,
						location2: req.body.location2,
						location3: req.body.location3,
						location4: req.body.location4,
						location5: req.body.location5,
						
					});
					
					return res.redirect("/home");
				}	
				catch (error) {
					
					console.error(error);
					//return res.render(home_page, { errors: errors });
					//return res.redirect(home_page, { errors: errors });
				}
			}
			
async function update_location_page(req, res) {
					console.log("update location page accessed");
					return res.render('admin/location');
				}
							
router.get("/review",      (req, res) => {
	console.log("Home page accessed");
	return res.render('review', {
	});
});

router.get("/ticket",      function(req, res) {
	console.log("Home page accessed");
	return res.render('ticket', {

	});
});
