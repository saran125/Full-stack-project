import ORM    from 'sequelize';
const { Sequelize } = ORM;


import { ModelRoomtype } from './roomtype.mjs';
import { ModelCheckout } from './checkout.mjs';
import { Modelbooked } from './choice.mjs';
import { Modellocation } from './update_location.mjs';
import { Modeltime } from './update_time.mjs';
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
		Modeltime.initialize(database);
		Modeldate.initialize(database);
		Modellocation.initialize(database);
		

		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc
	
		console.log("Adding intitialization hooks");
		//	Run once hooks during initialization 
		database.addHook("afterBulkSync", generate_booking.email, generate_booking.bind(this, database));
		database.addHook("afterBulkSync", generate_roomtype.uuid, generate_roomtype.bind(this, database));
		database.addHook("afterBulkSync", generate_checkout.uuid, generate_checkout.bind(this, database));
		database.addHook("afterBulkSync", generate_time.uuid, generate_time.bind(this, database));
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
			email   : "root@mail.com",
			role    : "admin",
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
			card_number: "123456781",
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
			uuid    : "00000000-0000-0000-0000-000000000000",
			email   : "root@mail.com",
			role    : "admin",
			verified: true,
			choice  : "movie",
			location: "bishan",
			time: "9am",
			date : "17th may 2021",
			small: "4",
			medium: "4",
			big: "4"
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
 async function generate_time(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_time.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_time");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			time1 : "9am",
			time2 : "12pm",
			time3 : "3pm",
			time4 : "6pm",
			time5 : "9pm"
		};
		//	Find for existing account with the same id, create or update
		var account = await Modeltime.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): Modeltime.create(root_parameters));
		
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
 async function generate_location(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_location.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_location");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			location1 : "Bishan",
			location2 : "AMK Hub",
			location3 : "J8",
			location4 : "OTH",
			location5 : "Jewel"
		};
		//	Find for existing account with the same id, create or update
		var account = await Modellocation.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): Modellocation.create(root_parameters));
		
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
 async function generate_date(database, options) {
	//	Remove this callback to ensure it runs only once
	database.removeHook("afterBulkSync", generate_date.uuid);
	//	Create a root user if not exists otherwise update it
	try {
		console.log("Generate_date");
		const root_parameters = {	
			uuid    : "00000000-0000-0000-0000-000000000000",
			date1 : "17th May 2021",
			date2 : "18th May 2021",
			date3 : "19th May 2021",
			date4 : "20th May 2021",
			date5 : "21th May 2021"
		};
		//	Find for existing account with the same id, create or update
		var account = await Modeldate.findOne({where: { "uuid": root_parameters.uuid }});
		
		account = await ((account) ? account.update(root_parameters): Modeldate.create(root_parameters));
		
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

