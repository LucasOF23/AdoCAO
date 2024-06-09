import {Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import State from "./state.model.js"

class UserManagesONG extends Model {};

UserManagesONG.init({}, {sequelize: sequelize, timestamps: false });
export default UserManagesONG;
