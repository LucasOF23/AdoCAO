import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import State from "./state.model.js"

class City extends Model {};

City.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
}, {sequelize: sequelize, timestamps: false });

City.belongsTo(State);

export default City;
