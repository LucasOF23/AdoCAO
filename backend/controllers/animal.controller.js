import model from "../models/animal.model.js";
import User from "../models/user.model.js";
import City from "../models/city.model.js";
import ONG from "../models/ong.model.js";
import UserWorksAtONG from "../models/userworksatong.js";
import AnimalTag from "../models/animaltag.model.js";
import AnimalSpecie from "../models/animalspecie.model.js";
import imageUploader from "../upload/image.js";
import { Op } from "sequelize";

const defaultInclude = [
	{ model: City },
	{ model: User, attributes: ['id', 'name', 'email'] },
	{ model: ONG, attributes: ['id', 'name', 'address'], include: City },
	{ model: AnimalTag, through: { attributes: [] } },
	{ model: AnimalSpecie }
];

function _minMaxQuery(minv, maxv) {
	if(minv && maxv)
		return { [Op.between]: [minv, maxv] };
	else if(minv)
		return { [Op.gte]: minv };
	else if(maxv)
		return { [Op.lte]: maxv };
	return {};
}

function _deltaDate(years) {
	let date = new Date();
	date.setFullYear(date.getFullYear() + years);
	return date;
}

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
		console.log(res);
		response.status(200).json((res) ? res : []);
	} catch (err) {
		console.log(err);
		response.status(500).send();
	}
}

async function findWithFilter(request, response) {
	let queryData = {};
	if(request.body.genders)
		queryData.animalGender = { [Op.or]: request.body.genders };
	if(request.body.cityIds)
		queryData.CityId = { [Op.or]: request.body.cityIds };
	if(request.body.speciesIds)
		queryData.AnimalSpecieId = { [Op.or]: request.body.speciesIds };
	if(request.body.ownerKind) {
		switch(request.body.ownerKind) {
		case 'user': queryData.UserId = { [Op.not]: null };
			break;
		case 'ong': queryData.ONGId = { [Op.not]: null };
			break;
		default:
			return response.status(400).send('Atributo ownerKind incorreto.');
		}
	}
	if(request.body.isVerm) 
		queryData.isDewormed = true;
	if(request.body.isCast)
		queryData.isNeutered = true;
	if(request.body.isAdopted)
		queryData.isAdopted = true;
	else
		queryData.isAdopted = false;
	
	if(request.body.heightMin || request.body.heightMax)
		queryData.heightInCm = _minMaxQuery(request.body.heightMin, request.body.heightMax);
	if(request.body.weightMin || request.body.weightMax)
		queryData.weightInKg = _minMaxQuery(request.body.weightMin, request.body.weightMax);
	if(request.body.ageMin || request.body.ageMax) {		
		const dateMax = (request.body.ageMin) ? _deltaDate(-request.body.ageMin) : null;
		const dateMin = (request.body.ageMax) ? _deltaDate(-request.body.ageMax) : null;
		queryData.birthdate = _minMaxQuery(dateMin, dateMax);
	}

	try {
		const res = await model.findAll({ include: defaultInclude, where: queryData });
		
		if(request.body.tagIds) {
			const tagSet = new Set(request.body.tagIds);
			
			response.status(200).json(res.filter((animal) => {
				let cnt = 0;
				for(const tag of animal.AnimalTags) {
					if(tagSet.has(tag.id)) cnt++;
				}

				return cnt === tagSet.size;
			}));
		} else {
			response.status(200).json((res) ? res : []);	
		}
	} catch (err) {
		console.log(err);
		response.status(500).send();
	}
}

async function findById(request, response) {
	try {
		const res = await model.findByPk(request.params.id, { include: defaultInclude });
		if (!res)
			response.status(404).send();
		else
			response.status(200).json(res);
	} catch (res) {
		console.log(err);
		response.status(500).send();
	}
}

async function findByUserId(request, response) {
	try {
		const res = await model.findAll({ where: { UserId: request.params.id }, include: defaultInclude });
		response.status(200).json((res) ? res : []);
	} catch (err) {
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
		imagePath: request.file.key,
		heightInCm: request.body.heightInCm || null,
		weightInKg: request.body.weightInKg || null,
		isNeutered: request.body.isNeutered,
		isDewormed: request.body.isDewormed,
		animalGender: request.body.animalGender,
		AnimalSpecieId: request.body.AnimalSpecieId,
		CityId: request.body.CityId
	};

	console.log('1', data);

	if (request.body.isUserOwned === undefined || request.body.isUserOwned === null) {
		imageUploader.eraseRequestFiles(request);
		return response.status(400).send('Não está especificado se vai cadastrar na ong ou como usuário próprio.');
	}

	console.log('2', data);

	if (request.body.isUserOwned === true || request.body.isUserOwned === '1' || request.body.isUserOwned === 'true') {
		data.UserId = response.locals.userId;
	} else {
		if (!request.body.ongId) {
			imageUploader.eraseRequestFiles(request);
			return response.status(400).send('ONG não especificada.');
		}

		const rel = await UserWorksAtONG.findOne({
			where: {
				'UserId': response.locals.userId,
				'ONGId': request.body.ongId
			}
		});

		if (rel === null) {
			imageUploader.eraseRequestFiles(request);
			return response.status(403).send('Usuário não trabalha na ONG.');
		}

		data.ONGId = rel.ONGId;
	}

	console.log('3', data);

	try {
		const res = await model.create(data);
		console.log('4', data);
		response.status(201).json({
			id: res.id,
			imagePath: res.imagePath
		});
	} catch (err) {
		console.log('5', data);
		imageUploader.eraseRequestFiles(request);
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
			imageUploader.eraseFile(filename);
			response.status(200).send();
		}).catch(function (err) {
			console.log(err);
			response.status(500).send();
		});
}


async function update(request, response) {
	const allowedKeys = ['name', 'description', 'birthdate', 'heightInCm', 'weightInKg', 'isNeutered', 'isDewormed', 'animalGender', 'isAdopted', 'CityId', 'AnimalSpecieId'];
	let updData = {};
	for (const key of allowedKeys) {
		if (key in request.body) {
			updData[key] = request.body[key];
		}
	}

	let oldFilename = null;

	let animal = await model.findByPk(request.params.id);
	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	if (request.file) {
		updData['imagePath'] = request.file.key;
		oldFilename = animal.imagePath;
		animal.imagePath = request.file.key;
	}

	if(!updData.weightInKg)
		updData.weightInKg = null;
	if(!updData.heightInCm)
		updData.heightInCm = null;

	try {
		const res = await model.update(updData, { where: { id: request.params.id } });
		if (oldFilename)
			imageUploader.eraseFile(oldFilename);

		response.status(200).json({
			id: animal.id,
			imagePath: animal.imagePath
		});
	} catch (err) {
		imageUploader.eraseRequestFiles(request);
		console.log(err);
		response.status(500).send();
	}
}

async function addTag(request, response) {
	const animal = await model.findByPk(request.params.id);
	console.log('Comeco', request.body);

	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	if (!request.body.tagId)
		return response.status(400).send('Tag não especificada.');

	try {
		await animal.addAnimalTag(request.body.tagId);
		response.status(200).json();
	} catch (err) {
		console.log(err);
		response.status(500).send();
	};
}

async function removeTag(request, response) {
	const animal = await model.findByPk(request.params.id);
	if (!animal) {
		return response.status(400).send('Animal não existe.');
	}

	if (!await checkPermission(response, animal)) {
		return response.status(403).send('Usuário não é dono do animal ou não trabalha na ong dele.');
	}

	try {
		await animal.removeAnimalTag(request.body.tagId);
		response.status(200).send();
	} catch (err) {
		console.log(err);
		response.status(500).send();
	}
}

const animalController = {
	findAll,
	findWithFilter,
	findById,
	create,
	deleteByPk,
	update,
	findByUserId,
	addTag,
	removeTag
};
export default animalController;
