import AnimalSpecie from "../models/animalspecie.model.js";

async function findAll(request, response) {
    try {
        const animalSpecies = await AnimalSpecie.findAll();
        response.status(200).json(animalSpecies);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

async function findByName(request, response) {
    const name = request.params.name;
    try {
        const animalSpecies = await AnimalSpecie.findAll({ where: { name } });
        response.status(200).json(animalSpecies);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

async function create(request, response) {
    if (!response.locals.isOngManager && !response.locals.isSuperAdmin) {
        return response.status(403).send('Apenas administradores de ONG ou superadmins podem criar espécies de animais.');
    }

	if(!request.body.name) {
		return response.status(400).send('Nome não especificado.');
	}
	
    try {
        const createdSpecie = await AnimalSpecie.create({ name: request.body.name });
        response.status(201).json(createdSpecie);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

async function remove(request, response) {
    if (!response.locals.isOngManager && !response.locals.isSuperAdmin) {
        return response.status(403).send('Apenas administradores de ONG ou superadmins podem remover espécies de animais.');
    }

    const id = request.params.id;
    try {
        const deletedSpecieCount = await AnimalSpecie.destroy({ where: { id } });
        if (deletedSpecieCount === 0) {
            return response.status(404).send('Espécie de animal não encontrada.');
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
