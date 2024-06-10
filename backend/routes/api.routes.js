import express from "express";
import authController from "../controllers/auth.controller.js";
import animalController from "../controllers/animal.controller.js"

const router = express.Router();
const needAuth = authController.validateToken;

router.post("/signup", authController.register);
router.post("/signin", authController.login);
router.post('/change_password', needAuth, authController.changePassword);

// TODO: RETIRAR ISSO DAQUI, É SÓ PARA TESTAR
router.get("/users", authController.findAll);

router.get('/animals', animalController.findAll);
router.post('/animals', needAuth, animalController.create);

router.get('/animals/:id', animalController.findById);
router.put('/animals/:id', needAuth, animalController.update);
router.delete('/animals/:id', needAuth, animalController.deleteByPk);

router.get('/users/:id/animals', animalController.findByUserId);

export default router;
