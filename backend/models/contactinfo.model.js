import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import User from './user.model.js'

class ContactInfo extends Model {};

ContactInfo.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	email: { type: DataTypes.STRING, allowNull: true },
	instagramProfile: { type: DataTypes.STRING, allowNull: true },
	facebookProfile: { type: DataTypes.STRING, allowNull: true },
	telephoneNumber: { type: DataTypes.STRING(15), allowNull: true },
	other: { type: DataTypes.STRING, allowNull: true },
}, {sequelize: sequelize, timestamps: false });

ContactInfo.hasOne(User);

export default ContactInfo;
