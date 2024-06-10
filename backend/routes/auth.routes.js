import authController from "../controllers/auth.controller.js";

function addAuthRoutes(router, needAuth) {
	/**
	   @param name
	   @param email
	   @param password

	   @returns 201 - { token, payload }
	   @returns 400 - error (email already exists or bad input format)
	   @returns 500 - error (unkown error)
	*/
	router.post("/signup", authController.register);

	/**
	   @param email
	   @param password

	   @returns 200 - { token, payload }
	   @returns 400 - error (bad input format)
	   @returns 401 - error (invalid password)
	   @returns 404 - error (user not found)
	*/
	router.post("/signin", authController.login);

	/**
	   @param oldPassword
	   @param newPassword

	   @returns 200
	   @returns 400 - error (bad input format)
	   @returns 401 - error (invalid old password)
	   @returns 500 - error (unkown error)
	*/
	router.post('/change_password', needAuth, authController.changePassword);

	// TODO: RETIRAR ISSO DAQUI, É SÓ PARA TESTAR
	router.get("/users", authController.findAll);
}

export default addAuthRoutes

