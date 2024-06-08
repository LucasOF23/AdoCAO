import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import City from "./city.model.js"

class ONG extends Model {};

ONG.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
	cnpj: { type: DataTypes.CHAR(14), allowNull: false, unique: true },
	address: { type: DataTypes.STRING, allowNull: false }
}, {sequelize: sequelize, timestamps: false });

ONG.belongsTo(City);

export default ONG;
