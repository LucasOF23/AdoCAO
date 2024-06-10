import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class City extends Model {};

City.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
	state: { allowNull: false, type: DataTypes.ENUM(
		'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
		'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
		'RS','RO','RR','SC','SP','SE','TO') }
}, {sequelize: sequelize, timestamps: false });

export default City;
