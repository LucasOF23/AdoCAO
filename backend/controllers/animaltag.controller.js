import AnimalTag from "../models/animaltag.model.js";
import { Op } from "sequelize";

async function findAll(request, response) {
    try {
        const animalTags = await AnimalTag.findAll();
        response.status(200).json(animalTags);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

async function findByName(request, response) {
    const name = request.params.name;
    try {
        const animalTags = await AnimalTag.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
        response.status(200).json(animalTags);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

async function create(request, response) {
    if (!response.locals.isOngManager && !response.locals.isSuperAdmin) {
        return response.status(403).send('Only ONG managers or superadmins can create animal tags.');
    }

	if(!request.body.name) {
		return response.status(400).send('Nome não especificado.');
	}
	
    try {
        const createdTag = await AnimalTag.create({ name: request.body.name });
        response.status(201).json(createdTag);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

async function remove(request, response) {
    if (!response.locals.isOngManager && !response.locals.isSuperAdmin) {
        return response.status(403).send('Only ONG managers or superadmins can remove animal tags.');
    }

    const id = request.params.id;
    try {
        const deletedTagCount = await AnimalTag.destroy({ where: { id } });
        if (deletedTagCount === 0) {
            return response.status(404).send('Animal tag not found.');
        }
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error.message);
    }
}

export default {
    findAll,
    findByName,
    create,
    remove
};
