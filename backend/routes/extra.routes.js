import cityController from "../controllers/city.controller.js";

function addCityRoutes(router) {
	/**
	   @params state (optional)
	   @params name (optional if and only if state is specified)

	   @returns 200 - List of cities
	   @returns 400 - error (bad input format)
	 */
	router.get('/cities', cityController.findAllMixed);
}

export { addCityRoutes };
