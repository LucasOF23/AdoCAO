import model from "../models/animal.model.js";
import User from "../models/user.model.js";
import City from "../models/city.model.js";
import ONG from "../models/ong.model.js"
import UserWorksAtONG from "../models/userworksatong.js"
import { eraseFile, eraseRequestFiles } from "../upload/image.js"

const defaultInclude = [
	{ model: City },
	{ model: User, attributes: ['id', 'name'] },
	{ model: ONG, attributes: ['id', 'name', 'address'], include: City }
];

async function findAll(request, response) {
	model
		.findAll({ include: defaultInclude }).then(function (res) {
			response.status(200).json(res);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

async function findById(request, response) {
	model
		.findByPk(request.params.id, { include: defaultInclude })
		.then(function (res) {
			response.status(200).json(res);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

async function findByUserId(request, response) {
	model
		.findAll({ where: { UserId: request.params.id }, include: defaultInclude })
		.then(function (results) {
			response.status(200).json(results);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

// ==================
// === NEEDS AUTH ===
// ==================

async function create(request, response) {
	if(!request.file) {
		return response.status(400).send('Sem foto.');
	}

	let data = {
		name: request.body.name,
		description: request.body.description,
		birthdate: request.body.birthdate,
		imagePath: request.file.filename,
		heightInCm: request.body.heightInCm,
		weightInKg: request.body.weightInKg,
		isNeutered: request.body.isNeutered,
		isDewormed: request.body.isDewormed,
		animalGender: request.body.animalGender,
		AnimalSpecieId: request.body.AnimalSpecieId,
		CityId: request.body.CityId
	};

	if(request.body.isUserOwned === undefined || request.body.isUserOwned === null) {
		eraseRequestFiles(request);
		return response.status(400).send('Não está especificado se vai cadastrar na ong ou como usuário próprio.');
	}

	if(request.body.isUserOwned == '1') {
		data.UserId = response.locals.userId;
	} else {
		if(!request.body.ongId) {
			eraseRequestFiles(request);
			return response.status(400).send('ONG não especificada.');
		}
		
		const rel = await UserWorksAtONG.findOne({
			where: {
				'UserId': response.locals.userId,
				'ONGId': request.body.ongId
			}
		});

		if(rel === null) {
			eraseRequestFiles(request);
			return response.status(403).send('Usuário não trabalha na ONG.');
		}

		data.ONGId = rel.ONGId;
	}
	
	model
		.create(data).then(function (res) {
			response.status(201).json(res);
		}).catch(function (err) {
			eraseRequestFiles(request);
			response.status(500).send(err);
		});
}

async function deleteByPk(request, response) {
	const animal = await model.findByPk(request.params.id);
	if(!animal) {
		return response.status(400).send('Animal não existe.');
	}
	if(animal.UserId != response.locals.userId) {
		return response.status(403).send('Usuário não é dono do animal.');
	}

	const filename = animal.imagePath;
	
	model
		.destroy({ where: { id: request.params.id } })
		.then(function (res) {
			eraseFile(filename);
			response.status(200).send();
		}).catch(function (err) {
			response.status(500).send(err);
		});
}


async function update(request, response) {
	const allowedKeys = ['name', 'description', 'birthdate', 'heightInCm', 'weightInKg', 'isNeutered', 'isDewormed', 'animalGender', 'CityId', 'AnimalSpecieId'];
	let updData = {};
	for(const key of allowedKeys) {
		if(key in request.body) {
			updData[key] = request.body[key];
		}
	}

	let oldFilename = null;
	
	const animal = await model.findByPk(request.params.id);
	if(!animal) {
		return response.status(400).send('Animal não existe.');
	}
	if(animal.UserId != response.locals.userId) {
		return response.status(403).send('Usuário não é dono do animal.');
	}

	if(request.file) {
		updData['imagePath'] = request.file.filename;
		oldFilename = animal.imagePath;
	}
	
	model
		.update(updData, {where: { id: request.params.id }})
		.then(function (res) {
			if(oldFilename) {
				eraseFile(oldFilename);
			}
			
			response.status(200).send();
		}).catch((e) => {
			response.status(500).json(e);
		});
}

export default {
  findAll,
  findById,
  create,
  deleteByPk,
  update,
  findByUserId,
};
