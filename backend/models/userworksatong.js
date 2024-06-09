import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import State from "./state.model.js"

class UserWorksAtONG extends Model {};

UserWorksAtONG.init({}, {sequelize: sequelize, timestamps: false });
export default UserWorksAtONG;
