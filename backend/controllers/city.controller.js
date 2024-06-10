import City from "../models/city.model.js";
import { Op } from "sequelize";

async function findAllMixed(request, response) {
	const { state, name } = request.query;

	if(!state && !name)
		return response.status(400).send('Estado ou nome não especificados.');

	let queryData;

	if(name) {
		queryData = {
			name: { [Op.iLike]: `%${name}%` }
		};
	}
	
	if(state)
		queryData.state = state;
	
	try {
		const cities = await City.findAll({ where: queryData });
		response.status(200).json(cities);
	} catch (error) {
		response.status(500).send(error.message);
	}
}

export default {
	findAllMixed
};
