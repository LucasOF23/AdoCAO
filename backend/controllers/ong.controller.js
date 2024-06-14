import model from "../models/ong.model.js";
import User from "../models/user.model.js";
import UserWorksAtONG from "../models/userworksatong.js"
import Animal from "../models/animal.model.js";
import City from "../models/city.model.js";

const defaultInclude = [
	{ model: City },
];
const defaultAttr = ['id', 'name', 'address'];

async function getWorkRelation(userId, ongId) {
	return UserWorksAtONG.findOne({ where: {
		UserId: userId,
		ONGId: ongId
	}});
}

async function findAll(request, response) {
	try {
		const res = await model.findAll({ attributes: defaultAttr, include: defaultInclude });
		response.status(200).json( (res) ? res : [] );
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

async function findById(request, response) {
	try {
		const res = await model.findByPk(request.params.id, { attributes: defaultAttr, include: defaultInclude } );
		if(res)
			response.status(200).json(res);
		else
			response.status(404).send();
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

async function findWorkers(request, response) {
	try {
		const res = await User.findAll( { attributes: ['id', 'name'], include: {
			model,
			attributes: ['id'],
			through: {
				attributes: ['isManager'],
				where: { ONGId: request.params.id }
			},
			required: true
		} });
		
		response.status(200).json(res.map( el => {
			el = el.get({plain: true});
			el.isManager = el.ONGs[0].UserWorksAtONG.isManager;
			delete el.ONGs;
			return el;
		}));
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

async function findAnimals(request, response) {
	try {
		const res = await Animal.findAll( { where: { ONGId: request.params.id }});
		response.status(200).json( (res) ? res : [] );
	} catch(err) {
		console.log(err);
		response.status(500).send();		
	}
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

	try {
		const res = await model.create(data);
		response.status(201).json(res);
	} catch(err) {
		response.status(500).send(err);
	}
}

async function update(request, response) {
	const allowedKeys = ['name', 'address', 'cnpj', 'CityId'];
	let updData = {};
	for(const key of allowedKeys) {
		if(key in request.body)
			updData[key] = request.body[key];
	}

	try {
		if(!response.locals.isSuperAdmin) {
			const workRel = await getWorkRelation(response.locals.userId, request.params.id);
			if(!workRel)
				return response.status(403).send('Usuário não trabalha na ONG (ou ela não existe).');

			if(!workRel.isManager)
				return response.status(403).send('Usuário não é administrador da ONG.');
		}

		await model.update(updData, {where: { id: request.params.id }});
		response.status(200).send();
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

async function assignWorker(request, response) {
	if(!request.body.email || request.body.isManager === undefined) 
		return response.status(400).send('Email ou status de administrador não especificados.');

	try {
		if(!response.locals.isSuperAdmin) {
			const workRel = await getWorkRelation(response.locals.userId, request.params.id);
			if(!workRel)
				return response.status(403).send('Usuário não trabalha na ONG (ou ela não existe).');

			if(!workRel.isManager && request.body.isManager) 
				return response.status(403).send('Usuário não é administrador da ONG.');
		}

		const user = await User.findOne({ where: { email: request.body.email } });
		if(!user)
			return response.status(400).send('Usuário a ser adicionado não encontrado.');

		await UserWorksAtONG.create({
			UserId: user.id,
			ONGId: request.params.id,
			isManager: request.body.isManager
		});
		
		response.status(200).send();
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

async function unassignWorker(request, response) {
	try {
		if(!response.locals.isSuperAdmin) {
			const workRel = await getWorkRelation(response.locals.userId, request.params.id);
			if(!workRel) 
				return response.status(403).send('Usuário não trabalha na ONG (ou ela não existe).');

			if(!workRel.isManager) 
				return response.status(403).send('Usuário não é administrador da ONG.');
		}

		const user = await User.findOne({ where: { email: request.body.email } });
		if(!user)
			return response.status(400).send('Usuário a ser adicionado não encontrado.');
		
		await UserWorksAtONG.destroy({ where: {
			UserId: user.id,
			ONGId: request.params.id
		}});
		
		response.status(200).send();
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
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
