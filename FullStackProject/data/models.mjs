import Hash   from 'hash.js'
import ORM    from 'sequelize';
const { Sequelize } = ORM;


// Nigel


import { ModelReview} from './review.mjs';
import {ModelFaq} from './faq.mjs';
/**
 * @param database {ORM.Sequelize}
 */
export function initialize_models(database) {
	try {
		console.log("Intitializing ORM models");
		//	Initialzie models
		ModelReview.initialize(database);
		ModelFaq.initialize(database);
		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc
	
		console.log("Adding intitialization hooks");
		//	Run once hooks during initialization 
		database.addHook("afterBulkSync", generate_root_account.name,  generate_root_account.bind(this, database));
		database.addHook("afterBulkSync", generate_Faq.name,  generate_Faq.bind(this, database));
	
	}
	catch (error) {
		console.error ("Failed to configure ORM models");
		console.error (error);
	}
}

/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
 async function generate_root_account(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_root_account.name);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generating root administrator account");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			"rating"     :'3',
			"feedback": "good"
		};
		//	Find for existing account with the same id, create or update
		var account = await ModelReview.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): ModelReview.create(root_parameters));
		
		console.log("== Generated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}



/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
 async function generate_Faq(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_Faq.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_Faq");
		const root_parameters = {	
			uuid: "00000000-0000-0000-0000-000000000000",
			questions:"Is this good?",
			answers:"Yes"

		};
		//	Find for existing account with the same id, create or update
		var account = await ModelFaq.findOne({where: { "uuid": root_parameters.uuid }});
		account = await ((account) ? account.update(root_parameters): ModelFaq.create(root_parameters));
		
		console.log("== Gxenerated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}
// Saran

import { ModelRoomtype } from './roomtype.mjs';
import { ModelCheckout } from './checkout.mjs';
import { Modelbooked } from './choice.mjs';
import { Modellocation } from './update_location.mjs';
import { Modelchoice } from './update_choice.mjs';
import { Modeldate } from './update_date.mjs';

/**
 * @param database {ORM.Sequelize}
 */
export function initialize_models(database) {
	try {
		console.log("Intitializing ORM models");
		//	Initialzie models
		ModelRoomtype.initialize(database);
		ModelCheckout.initialize(database);
		Modelbooked.initialize(database);
		Modelchoice.initialize(database);
		

		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc
	
		console.log("Adding intitialization hooks");
		//	Run once hooks during initialization 
		database.addHook("afterBulkSync", generate_booking.email, generate_booking.bind(this, database));
		database.addHook("afterBulkSync", generate_roomtype.uuid, generate_roomtype.bind(this, database));
		database.addHook("afterBulkSync", generate_checkout.uuid, generate_checkout.bind(this, database));
		database.addHook("afterBulkSync", generate_choice.uuid, generate_choice.bind(this, database));
		database.addHook("afterBulkSync", generate_location.uuid, generate_location.bind(this, database));
		database.addHook("afterBulkSync", generate_date.uuid, generate_date.bind(this, database));

			}
	catch (error) {
		console.error ("Failed to configure ORM models");
		console.error (error);
	}
}

/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
 async function generate_booking(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_booking.email);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_booking page");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			verified: true,
			choice  : "movie",
			location : "Bishan",
			date : "17th may 2020",
			time : "9am",
		};
		//	Find for existing account with the same id, create or update
		var account = await Modelbooked.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): Modelbooked.create(root_parameters));
		
		console.log("== Gxenerated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}


/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
 async function generate_checkout(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_checkout.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_checkout");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			username: "mark_tan_1234",
			card_number: "123456",
			card_holder: "Mark tan",
			expiry_month : "2",
			expiry_year : "24",
			ccv: "123",
		};
		//	Find for existing account with the same id, create or update
		var account = await ModelCheckout.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): ModelCheckout.create(root_parameters));
		
		console.log("== Gxenerated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}

/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
 async function generate_roomtype(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_roomtype.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_roomtype");
		const root_parameters = {	
			uuid: "00000000-0000-0000-0000-000000000000",
			location: "bishan",
			time: "9am",
			date: "17th May 2021",
			small: 5,
			medium: 5,
			big: 5
		};
		//	Find for existing account with the same id, create or update
		var account = await ModelRoomtype.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): ModelRoomtype.create(root_parameters));
		
		console.log("== Gxenerated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}

/**
 * This function creates a root account 
 * @param {Sequelize} database Database ORM handle
 * @param {SyncOptions} options Synchronization options, not used
 */
 async function generate_choice(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_choice.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_choice");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			time1 : "9am",
			time2 : "12pm",
			time3 : "3pm",
			time4 : "6pm",
			time5 : "9pm",
			date1: "17th May 2021",
			date2 : "18th May 2021",
			date3 : "19th May 2021",
			date4 : "20th May 2021",
			date5 : "21th May 2021",
			location1: "Jewel",
			location2 : "Our Tampines Hub",
			location3: "Ang Mo Kio ",
			location4 : "Bedok",
			location5 : "Bishan"
		};
		//	Find for existing account with the same id, create or update
		var account = await Modelchoice.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): Modelchoice.create(root_parameters));
		
		console.log("== Gxenerated root account ==");
		console.log(account.toJSON());
		console.log("============================");
		return Promise.resolve();
	}
	catch (error) {
		console.error ("Failed to generate root administrator user account");
		console.error (error);
		return Promise.reject(error);
	}
}
// xiao li


// Qiao qing
