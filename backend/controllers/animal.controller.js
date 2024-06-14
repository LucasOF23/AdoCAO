import model from "../models/animal.model.js";
import User from "../models/user.model.js";
import City from "../models/city.model.js";
import ONG from "../models/ong.model.js";
import UserWorksAtONG from "../models/userworksatong.js";
import AnimalTag from "../models/animaltag.model.js";
import { eraseFile, eraseRequestFiles } from "../upload/image.js";

const defaultInclude = [
	{ model: City },
	{ model: User, attributes: ['id', 'name'] },
	{ model: ONG, attributes: ['id', 'name', 'address'], include: City },
	{ model: AnimalTag, through: { attributes: [] } }
];

async function checkPermission(response, animal) {
	const { userId, isSuperAdmin } = response.locals;
	if (isSuperAdmin) return true;

	if (animal.UserId)
		return userId === animal.UserId;

	const workRel = await UserWorksAtONG.findOne({
		where: {
			UserId: userId,
			ONGId: animal.ONGId
		}
	});

	return workRel !== null;
}

async function findAll(request, response) {
	try {
		const res = await model.findAll({ include: defaultInclude });
		response.status(200).json( (res) ? res : []);
	} catch(err) {
		console.log(err);
		response.status(500).send();		
	}
}

async function findById(request, response) {
	try {
		const res = await model.findByPk(request.params.id, { include: defaultInclude });
		if(!res)
			response.status(404).send();
		else 
			response.status(200).json(res);
	} catch(res) {
		console.log(err);
		response.status(500).send();
	}
}

async function findByUserId(request, response) {
	try {
		const res = await model.findAll({ where: { UserId: request.params.id }, include: defaultInclude });
		response.status(200).json( (res) ? res : []);
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

// ==================
// === NEEDS AUTH ===
// ==================

async function create(request, response) {
	if (!request.file) {
		return response.status(400).send('Sem foto.');
	}

	let data = {
		name: request.body.name,
		description: request.body.description,
		birthdate: request.body.birthdate,
		imagePath: request.file.filename,
		heightInCm: request.body.heightInCm || null,
		weightInKg: request.body.weightInKg || null,
		isNeutered: request.body.isNeutered,
		isDewormed: request.body.isDewormed,
		animalGender: request.body.animalGender,
		AnimalSpecieId: request.body.AnimalSpecieId,
		CityId: request.body.CityId
	};

	if (request.body.isUserOwned === undefined || request.body.isUserOwned === null) {
		eraseRequestFiles(request);
		return response.status(400).send('Não está especificado se vai cadastrar na ong ou como usuário próprio.');
	}

	if (request.body.isUserOwned) {
		data.UserId = response.locals.userId;
	} else {
		if (!request.body.ongId) {
			eraseRequestFiles(request);
			return response.status(400).send('ONG não especificada.');
		}

		const rel = await UserWorksAtONG.findOne({
			where: {
				'UserId': response.locals.userId,
				'ONGId': request.body.ongId
			}
		});

		if (rel === null) {
			eraseRequestFiles(request);
			return response.status(403).send('Usuário não trabalha na ONG.');
		}

		data.ONGId = rel.ONGId;
	}

	try {
		const res = await model.create(data);
		response.status(201).json({
			id: res.id,
			imagePath: res.imagePath
		});
	} catch(err) {
		eraseRequestFiles(request);
		console.log(err);
		response.status(500).send();
	}
}

async function deleteByPk(request, response) {
	const animal = await model.findByPk(request.params.id);
	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	const filename = animal.imagePath;

	model
		.destroy({ where: { id: request.params.id } })
		.then(function (res) {
			eraseFile(filename);
			response.status(200).send();
		}).catch(function (err) {
			console.log(err);
			response.status(500).send();
		});
}


async function update(request, response) {
	const allowedKeys = ['name', 'description', 'birthdate', 'heightInCm', 'weightInKg', 'isNeutered', 'isDewormed', 'animalGender', 'CityId', 'AnimalSpecieId'];
	let updData = {};
	for (const key of allowedKeys) {
		if (key in request.body) {
			updData[key] = request.body[key];
		}
	}

	let oldFilename = null;

	const animal = await model.findByPk(request.params.id);
	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	if (request.file) {
		updData['imagePath'] = request.file.filename;
		oldFilename = animal.imagePath;
	}

	model
		.update(updData, { where: { id: request.params.id } })
		.then(function (res) {
			if (oldFilename) {
				eraseFile(oldFilename);
			}

			response.status(200).send();
		}).catch((e) => {
			console.log(e);
			response.status(500).send();
		});
}

async function addTag(request, response) {
	const animal = await model.findByPk(request.params.id);
	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	animal.addAnimalTag(request.body.tagId)
		.then(function (res) {
			response.status(200).send();
		}).catch(function (err) {
			console.log(err);
			response.status(500).send();
		});
}

async function removeTag(request, response) {
	const animal = await model.findByPk(request.params.id);
	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	animal.removeAnimalTag(request.body.tagId)
		.then(function (res) {
			response.status(200).send();
		}).catch(function (err) {
			console.log(err);
			response.status(500).send();
		});
}

const animalController = {
	findAll,
	findById,
	create,
	deleteByPk,
	update,
	findByUserId,
	addTag,
	removeTag
};
export default animalController;
