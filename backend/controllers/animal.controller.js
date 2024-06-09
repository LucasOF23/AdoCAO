import model from "../models/animal.model.js";
import User from "../models/user.model.js";
import UserWorksAtONG from "../models/userworksatong.js"

async function findAll(request, response) {
	model
		.findAll().then(function (res) {
			response.json(res).status(200);
		}).catch(function (err) {
			response.json(err).status(500);
		});
}

async function findById(request, response) {
	model
		.findByPk(request.params.id, { include: User })
		.then(function (res) {
			response.json(res).status(200);
		}).catch(function (err) {
			response.json(err).status(500);
		});
}

async function findByUserId(request, response) {
	model
		.findAll({ where: { UserId: request.params.id } })
		.then(function (results) {
			response.json(results).status(200);
		}).catch(function (err) {
			response.json(err).status(500);
		});
}

// ==================
// === NEEDS AUTH ===
// ==================

async function create(request, response) {
	let data = {
		name: request.body.name,
		description: request.body.description,
		birthdate: request.body.birthdate,
		imagePath: 'sem foto',
		heightInCm: request.body.heightInCm,
		weightInKg: request.body.weightInKg,
		isNeutered: request.body.isNeutered,
		isDewormed: request.body.isDewormed,
		animalGender: request.body.animalGender,
		AnimalSpecieId: request.body.AnimalSpecieId,
		CityId: request.body.CityId
	};

	if(request.body.isUserOwned === undefined || request.body.isUserOwned === null) {
		return response.status(400).send('Não está especificado se vai cadastrar na ong ou como usuário próprio.');
	}

	if(request.body.isUserOwned == '1') {
		data.UserId = response.locals.userId;
	} else {
		if(!request.body.ongId) {
			return response.status(400).send('ONG não especificada.');
		}
		
		const rel = await UserWorksAtONG.findOne({
			where: {
				'UserId': response.locals.userId,
				'ONGId': request.body.ongId
			}
		});

		if(rel === null) {
			return response.status(403).send('Usuário não trabalha na ONG.');
		}

		data.ONGId = rel.ONGId;
	}
	
	model
		.create(data).then(function (res) {
			response.json(res).status(201);
		}).catch(function (err) {
			response.json(err).status(500);
		});
}

async function deleteByPk(request, response) {
	const animal = await model.findByPk(request.params.id);
	if(animal.UserId != response.locals.userId) {
		return response.status(403).send('Usuário não é dono do animal.');
	}
	
	model
		.destroy({ where: { id: request.params.id } })
		.then(function (res) {
			response.status(200).send();
		}).catch(function (err) {
			response.json(err).status(500);
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

	const animal = await model.findByPk(request.params.id);
	if(animal.UserId != response.locals.userId) {
		return response.status(403).send('Usuário não é dono do animal.');
	}
	
	model
		.update(updData, {where: { id: request.params.id }})
		.then(function (res) {
			response.status(200).send();
		}).catch((e) => {
			response.json(e).status(500);
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
