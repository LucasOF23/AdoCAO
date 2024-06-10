import Animal from './models/animal.model.js'
import AnimalSpecie from './models/animalspecie.model.js'
import AnimalTag from './models/animaltag.model.js'
import City from './models/city.model.js'
import ContactInfo from './models/contactinfo.model.js'
import ONG from './models/ong.model.js'
import User from './models/user.model.js'
import sequelize from './models/dbconfig.js'

await sequelize.sync({ alter: true });


