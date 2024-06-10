import model from "../models/ong.model.js";
import User from "../models/user.model.js";
import UserWorksAtONG from "../models/userworksatong.js"
import Animal from "../models/animal.model.js";

async function getWorkRelation(userId, ongId) {
	return UserWorksAtONG.findOne({ where: {
		UserId: userId,
		ONGId: ongId
	}});
}

async function findAll(request, response) {
	model
		.findAll().then(function (res) {
			response.status(200).json(res);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

async function findById(request, response) {
	model
		.findByPk(request.params.id)
		.then(function (res) {
			response.status(200).json(res);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

async function findWorkers(request, response) {
	User.findAll( { attributes: ['id', 'name'], include: {
		model,
		attributes: ['id'],
		through: {
			attributes: ['isManager'],
			where: { ONGId: request.params.id }
		},
		required: true
	} }).then(function (res) {
		response.status(200).json(res.map( el => {
			el = el.get({plain: true});
			el.isManager = el.ONGs[0].UserWorksAtONG.isManager;
			delete el.ONGs;
			return el;
		} ));
	}).catch(function (err) {
		console.log(err);
		response.status(500).send(err);
	});
}

async function findAnimals(request, response) {
	Animal.findAll( {
		where: { ONGId: request.params.id }
	}).then(function (res) {
		response.status(200).json(res);
	}).catch(function (err) {
		response.status(500).send(err);
	});
}

// ==================
// === NEEDS AUTH ===
// ==================

async function create(request, response) {
	let data = {
		name: request.body.name,
		cnpj: request.body.cnpj,
		address: request.body.address,
		CityId: request.body.CityId
	};

	if(!response.locals.isSuperAdmin) {
		return response.status(403).send('Usuário não é super admin.');
	}

	model
		.create(data).then(function (res) {
			response.status(201).json(res);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

async function update(request, response) {
	const allowedKeys = ['name', 'address', 'cnpj', 'CityId'];
	let updData = {};
	for(const key of allowedKeys) {
		if(key in request.body) {
			updData[key] = request.body[key];
		}
	}

	if(!response.locals.isSuperAdmin) {
		const workRel = await getWorkRelation(response.locals.userId, request.params.id);
		if(!workRel) {
			return response.status(403).send('Usuário não trabalha na ONG (ou ela não existe).');
		}
		if(!workRel.isManager) {
			return response.status(403).send('Usuário não é administrador da ONG.');
		}
	}
	
	model
		.update(updData, {where: { id: request.params.id }})
		.then(function (res) {
			response.status(200).send();
		}).catch((e) => {
			response.status(500).json(e);
		});
}

async function assignWorker(request, response) {
	if(!request.body.email || request.body.isManager === undefined) {
		return response.status(400).send('Email ou status de administrador não especificados.');
	}
	
	if(!response.locals.isSuperAdmin) {
		const workRel = await getWorkRelation(response.locals.userId, request.params.id);
		if(!workRel) {
			return response.status(403).send('Usuário não trabalha na ONG (ou ela não existe).');
		}
		if(!workRel.isManager && request.body.isManager) {
			return response.status(403).send('Usuário não é administrador da ONG.');
		}
	}

	const user = await User.findOne({ where: { email: request.body.email } });
	if(!user) {
		return response.status(400).send('Usuário a ser adicionado não encontrado.');
	}

	UserWorksAtONG.create({
		UserId: user.id,
		ONGId: request.params.id,
		isManager: request.body.isManager
	}).then(function (res) {
		response.status(200).send();
	}).catch((e) => {
		response.status(500).json(e);
	});
}

async function unassignWorker(request, response) {
	if(!response.locals.isSuperAdmin) {
		const workRel = await getWorkRelation(response.locals.userId, request.params.id);
		if(!workRel) {
			return response.status(403).send('Usuário não trabalha na ONG (ou ela não existe).');
		}
		if(!workRel.isManager) {
			return response.status(403).send('Usuário não é administrador da ONG.');
		}
	}

	const user = await User.findOne({ where: { email: request.body.email } });
	if(!user) {
		return response.status(400).send('Usuário a ser adicionado não encontrado.');
	}
	
	UserWorksAtONG.destroy({ where: {
		UserId: user.id,
		ONGId: request.params.id
	} }).then(function (res) {
		response.status(200).send();
	}).catch((e) => {
		response.status(500).json(e);
	});
}

export default {
	findAll,
	findById,
	findWorkers,
	findAnimals,
	create,
	update,
	assignWorker,
	unassignWorker,
};
