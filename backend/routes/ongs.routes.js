import ongController from "../controllers/ong.controller.js"

function addOngsRoutes(router, needAuth) {
	/**
	   @returns Array of ONG objects.
	 */
	router.get('/ongs', ongController.findAll);

	/**
	   @params name, address, cnpj
	   @param CityId
	   
	   @returns 201 - ONG object
	   @returns 403 - error (user is not a super admin)
	   @returns 500 - error (unknown error)
	 */
	router.post('/ongs', needAuth, ongController.create);

	/**
	   @returns ONG object.
	 */
	router.get('/ongs/:id', ongController.findById);

	/**
	   @params name, address, cnpj
	   @param CityId
	   
	   @returns 200 - success
	   @returns 403 - error (user is not a super admin or not an admin of the ONG)
	   @returns 500 - error (unknown error)
	 */
	router.put('/ongs/:id', needAuth, ongController.update);

	/**
	   @returns Array of User objects who work at the specified ONG, with their manager status.
	 */
	router.get('/ongs/:id/users', ongController.findWorkers);

	/**
	   @params email, isManager
	   
	   @returns 200 - success
	   @returns 400 - error (email or manager status not specified)
	   @returns 403 - error (user is not a super admin or not an admin of the ONG)
	   @returns 400 - error (specified user not found)
	   @returns 500 - error (unknown error)
	 */
	router.post('/ongs/:id/users', needAuth, ongController.assignWorker);

	/**
	   @param email
	   
	   @returns 200 - success
	   @returns 403 - error (user is not a super admin or not an admin of the ONG)
	   @returns 400 - error (specified user not found)
	   @returns 500 - error (unknown error)
	 */
	router.delete('/ongs/:id/users', needAuth, ongController.unassignWorker);

	router.get('/ongs/:id/animals', ongController.findAnimals);
}

export default addOngsRoutes
