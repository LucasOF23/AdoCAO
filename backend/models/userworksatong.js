import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class UserWorksAtONG extends Model {};

UserWorksAtONG.init({
	isManager: { type: DataTypes.BOOLEAN, allowNull: false }
}, {sequelize: sequelize, timestamps: false });
export default UserWorksAtONG;
