import model from "../models/user.model.js"
import ContactInfo from "../models/contactinfo.model.js"
import ONG from "../models/ong.model.js"
import City from "../models/city.model.js"

// ==================
// === NEEDS AUTH ===
// ==================

async function findByPk(request, response) {
	let id = request.params.id || response.locals.userId;
	if (!id) {
		return response.status(400).send('Usuário não especificado.');
	}

	model.findByPk(id, { attributes: ['id', 'name', 'email', 'isSuperAdmin'], include: ContactInfo })
		.then(function (res) {
			response.status(200).json(res);
		}).catch(function (err) {
			response.status(500).send(err);
		});
}

async function update(request, response) {
	const allowedKeys = ['name', 'email'];
	let updData = {};
	for (const key of allowedKeys) {
		if (key in request.body) {
			updData[key] = request.body[key];
		}
	}

	let userId = request.params.id;
	if (!userId) {
		userId = response.locals.userId;
	} else if (userId != response.locals.userId && !response.locals.isSuperAdmin) {
		return response.status(403).send('Apenas super usuários podem editar outros.');
	}

	model.update(updData, {
		where: {
			id: userId
		}
	}).then(function (res) {
		response.status(200).send();
	}).catch(function (err) {
		response.status(500).send(err);
	});
}

async function updateContactInfo(request, response) {
	const allowedKeys = ['email', 'instagramProfile', 'facebookProfile', 'telephoneNumber', 'other'];
	let updData = {};
	for (const key of allowedKeys) {
		if (key in request.body) {
			updData[key] = request.body[key];
		}
	}

	let userId = request.params.id;
	if (!userId) {
		userId = response.locals.userId;
	} else if (userId != response.locals.userId && !response.locals.isSuperAdmin) {
		return response.status(403).send('Apenas super usuários podem editar outros.');
	}

	try {
		const user = await model.findByPk(userId);
		if(!user)
			return response.status(404).send('Usuário não encontrado.');

		await ContactInfo.update(updData, { where: { id: user.ContactInfoId } });
		response.status(200).send();
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

async function changeSuperAdminStatus(request, response) {
	if (!response.locals.isSuperAdmin) {
		return response.status(403).send('Usuário não é super usuário.');
	}

	if (request.body.newStatus === undefined || !request.params.id) {
		return response.status(400).send('Status ou usuário não especificados.');
	}

	model.update({ isSuperAdmin: request.body.newStatus }, {
		where: {
			id: request.params.id
		}
	}).then(function (res) {
		response.status(200).send();
	}).catch(function (err) {
		response.status(500).send(err);
	});
}

async function getOngs(request, response) {
	try{
		const res = await model.findByPk(response.locals.userId, {
			attributes: [],
			include: {
				model: ONG,
				through: { attributes: ['isManager'] },
				include: [
					{ model: City },
					{ model: ContactInfo }
				]
			}
		});

		response.status(200).send(res.ONGs.map(ong => {
			ong = ong.get({ plain: true });
			ong.isManager = ong.UserWorksAtONG.isManager;
			delete ong.UserWorksAtONG;

			return ong;
		}));
	} catch(err) {
		console.log(err);
		response.status(500).send();
	}
}

const userController = { findByPk, update, updateContactInfo, changeSuperAdminStatus, getOngs };
export default userController;
