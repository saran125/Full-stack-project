import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

/**
 * For enumeration use
**/
export class UserRole {
	static get Admin() { return "admin"; }
	static get User()  { return "user";  }
}

/**
 * A database entity model that represents contents in the database.
 * This model is specifically designed for users
 * @see "https://sequelize.org/master/manual/model-basics.html#taking-advantage-of-models-being-classes"
**/
export class ModelUser extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelUser.init({
			"uuid"       : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			"dateCreated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"choice"   : { type: DataTypes.STRING(64),  allowNull: false },
			"location"      : { type: DataTypes.STRING(128), allowNull: false },
			"date"   : { type: DataTypes.STRING(64),  allowNull: false },
			"time"   : { type: DataTypes.STRING(64),  allowNull: false },
			"roomtype"   : { type: DataTypes.STRING(64),  allowNull: false },
			"verified"   : { type: DataTypes.BOOLEAN,     allowNull: false, defaultValue: false }
		}, {
			"sequelize": database,
			"modelName": "Users",
			"hooks"    : {
				"afterUpdate": ModelUser._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelUser}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}

	get choice()  { return this.getDataValue("choice"); }
	get uuid()  { return this.getDataValue("uuid"); }
	get email() { return this.getDataValue("roomtype"); }
}


