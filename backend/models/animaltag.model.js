import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class AnimalTag extends Model {};

AnimalTag.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
}, {sequelize: sequelize, timestamps: false });

export default AnimalTag;
