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
export class ModelRoomtype extends Model {
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelRoomtype.init({
			"uuid"       : { type: DataTypes.CHAR(36),    foreignKey: true, defaultValue: DataTypes.UUIDV4 },
			"dateCreated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"dateUpdated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
			"email"      : { type: DataTypes.STRING(128), allowNull: false },
			"role"       : { type: DataTypes.ENUM(UserRole.User, UserRole.Admin), defaultValue: UserRole.User, allowNull: false },
			"verified"   : { type: DataTypes.BOOLEAN,     allowNull: false, defaultValue: false},
            "choice"     : { type: DataTypes.STRING(128) },
            "location" : { type: DataTypes.STRING(650), allowNull: false },
            "date" : { type: DataTypes.STRING(650), allowNull: false },
            "time" : { type: DataTypes.STRING(650), allowNull: false },
			"small": { type: DataTypes.STRING(6), allowNull: false },
			"medium": { type: DataTypes.STRING(5), allowNull: false },
			"big": { type: DataTypes.STRING(5), allowNull: false }
        }, {
			"sequelize": database,
			"modelName": "roomtype",
			"hooks"    : {
				"afterUpdate": ModelRoomtype._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelRoomtype}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}

    get email() { return this.getDataValue("email"); }
	get choice() { return this.getDataValue("choice"); }
	get location() { return this.getDataValue("location"); }  
	get date() { return this.getDataValue("date"); }  
	get time() { return this.getDataValue("time"); }  
	get roomtype() { return this.getDataValue("roomtype"); }
	  
}
