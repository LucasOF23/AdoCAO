import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import ONG from "./ong.model.js"
import UserWorksAtONG from "./userworksatong.js"
import ContactInfo from "./contactinfo.model.js";

class User extends Model {};

User.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	passwordHash: { type: DataTypes.STRING, allowNull: false },
	isSuperAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {sequelize: sequelize, timestamps: false });

User.belongsToMany(ONG, { through: UserWorksAtONG });
User.belongsTo(ContactInfo);

export default User;
