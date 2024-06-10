import animalController from "../controllers/animal.controller.js"
import { imageUploader } from "../upload/image.js"

function addAnimalsRoutes(router, needAuth) {
	/**
	   @returns List of Animal objects
	 */
	router.get('/animals', animalController.findAll);

	/**
	   @params name, description, birthdate, heightInCm, weightInKg, isNeutered, isDewormed, animalGender 
	   @param AnimalSpecieId
	   @param CityId
	   @param photo (file upload)
	   @param isUserOwned
	   @param ongId (required if and only if isUserOwned is false)

	   @returns 201 - animal
	   @returns 400 - error (bad input format)
	   @returns 403 - error (user does not work at ong)
	   @returns 500 - error (unknown error)
	 */
	router.post('/animals', needAuth, imageUploader.single('photo'), animalController.create);

	/**
	   @returns animal object
	 */
	router.get('/animals/:id', animalController.findById);

	/**
	   @returns List of Animal objects
	 */
	router.get('/users/:id/animals', animalController.findByUserId);

	/**
	   @params name, description, birthdate, heightInCm, weightInKg, isNeutered, isDewormed, animalGender 
	   @param AnimalSpecieId
	   @param CityId
	   @param photo (file upload)

	   @returns 200 - success
	   @returns 400 - error (bad input format)
	   @returns 403 - error (user does not own the animal or does not work at ong)
	   @returns 500 - error (unknown error)
	 */
	router.put('/animals/:id', needAuth, imageUploader.single('photo'), animalController.update);

	/**
	   @returns 200 - success
	   @returns 400 - error (animal does not exist)
	   @returns 403 - error (user does not own the animal)
	   @returns 500 - error (unknown error)
	 */
	router.delete('/animals/:id', needAuth, animalController.deleteByPk);
}

export default addAnimalsRoutes
