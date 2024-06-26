import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";

class AnimalHasTag extends Model {};

AnimalHasTag.init({}, {sequelize: sequelize, timestamps: false });
export default AnimalHasTag;
