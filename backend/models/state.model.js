import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class State extends Model {};

State.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
	code: { type: DataTypes.CHAR(2), allowNull: false }
}, {sequelize: sequelize, timestamps: false });

export default State;
