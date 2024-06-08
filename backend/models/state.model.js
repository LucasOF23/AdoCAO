import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class State extends Model {};

State.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false, unique: true },
	code: { type: DataTypes.CHAR(2), allowNull: false, unique: true }
}, {sequelize: sequelize, timestamps: false });

export default State;
