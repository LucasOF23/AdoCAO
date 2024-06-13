import { Model, DataTypes } from "sequelize";
import sequelize from "./dbconfig.js";
import AnimalSpecie from "./animalspecie.model.js"
import AnimalTag from "./animaltag.model.js"
import ONG from "./ong.model.js"
import User from "./user.model.js"
import City from "./city.model.js"

class Animal extends Model { };

Animal.init({
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.TEXT, allowNull: false },
	imagePath: { type: DataTypes.STRING, allowNull: false },
	birthdate: { type: DataTypes.DATEONLY, allowNull: false },
	heightInCm: { type: DataTypes.FLOAT, allowNull: true },
	weightInKg: { type: DataTypes.FLOAT, allowNull: true },
	isNeutered: { type: DataTypes.BOOLEAN, allowNull: false },
	isDewormed: { type: DataTypes.BOOLEAN, allowNull: false },
	animalGender: { type: DataTypes.CHAR(1), allowNull: true }
}, { sequelize: sequelize, timestamps: false });

Animal.belongsToMany(AnimalTag, { through: 'AnimalHasAnimalTag' });
Animal.belongsTo(AnimalSpecie);
Animal.belongsTo(ONG);
Animal.belongsTo(User);
Animal.belongsTo(City);

export default Animal;
