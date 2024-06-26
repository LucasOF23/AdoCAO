import userController from "../controllers/user.controller.js"

function addUserRoutes(router, needAuth) {
	router.get('/users/ongs', needAuth, userController.getOngs);
	
	router.put('/users/:id/contact-info', needAuth, userController.updateContactInfo);
	router.put('/users/contact-info', needAuth, userController.updateContactInfo);

	router.get('/users/:id', userController.findByPk);
	router.get('/users', needAuth, userController.findByPk);

	router.put('/users/:id', needAuth, userController.update);
	router.put('/users', needAuth, userController.update);

	router.post('/users/:id/change-super-admin', needAuth, userController.changeSuperAdminStatus);
}

export default addUserRoutes
