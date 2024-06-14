import model from "../models/user.model.js"
import ContactInfo from "../models/contactinfo.model.js"

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

	ContactInfo.update(updData, {
		where: {
			id: userId
		}
	}).then(function (res) {
		response.status(200).send();
	}).catch(function (err) {
		response.status(500).send(err);
	});
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

const userController = { findByPk, update, updateContactInfo, changeSuperAdminStatus };
export default userController;
