import cityController from "../controllers/city.controller.js";
import animalSpecieController from "../controllers/animalspecie.controller.js";
import animalTagController from "../controllers/animaltag.controller.js";

function addCityRoutes(router) {
	/**
	   @params state (optional)
	   @params name (optional if and only if state is specified)

	   @returns 200 - List of cities
	   @returns 400 - error (bad input format)
	 */
	router.get('/cities', cityController.findAllMixed);
}

function addAnimalSpecieRoutes(router, needAuth) {
	router.get('/animal-species', animalSpecieController.findAll);
	router.get('/animal-species/name/:name', animalSpecieController.findByName);

    /**
	   @params name.
	   
	   @returns 201 - Created animal species object.
	   @returns 400 - error (bad input format)
	   @returns 403 - Error (Only ONG managers or superadmins can create animal species).
	   @returns 500 - Error (Unknown error).
	 */
    router.post('/animal-species', needAuth, animalSpecieController.create);
	
    /**
	   @returns 200 - Success.
	   @returns 403 - Error (Only ONG managers or superadmins can remove animal species).
	   @returns 404 - Error (Animal species not found).
	   @returns 500 - Error (Unknown error).
	 */
    router.delete('/animal-species/:id', needAuth, animalSpecieController.remove);
}

function addAnimalTagRoutes(router, needAuth) {
	router.get('/animal-tags', animalTagController.findAll);
	router.get('/animal-tags/name/:name', animalTagController.findByName);

    /**
	   @params name.
	   
	   @returns 201 - Created animal tag object.
	   @returns 400 - error (bad input format)
	   @returns 403 - Error (Only ONG managers or superadmins can create animal tags).
	   @returns 500 - Error (Unknown error).
	 */
    router.post('/animal-tags', needAuth, animalTagController.create);
	
	/**
	   @returns 200 - Success.
	   @returns 403 - Error (Only ONG managers or superadmins can remove animal tags).
	   @returns 404 - Error (Animal species not found).
	   @returns 500 - Error (Unknown error).
	 */
    router.delete('/animal-tags/:id', needAuth, animalTagController.remove);
}

export { addCityRoutes, addAnimalSpecieRoutes, addAnimalTagRoutes };
