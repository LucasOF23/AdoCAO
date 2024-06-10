import express from "express";
import authController from "../controllers/auth.controller.js";
import animalController from "../controllers/animal.controller.js"
import ongController from "../controllers/ong.controller.js"
import { imageUploader } from "../upload/image.js"

const router = express.Router();
const needAuth = authController.validateToken;

router.post("/signup", authController.register);
router.post("/signin", authController.login);
router.post('/change_password', needAuth, authController.changePassword);

// TODO: RETIRAR ISSO DAQUI, É SÓ PARA TESTAR
router.get("/users", authController.findAll);

router.get('/animals', animalController.findAll);
router.post('/animals', needAuth, imageUploader.single('photo'), animalController.create);

router.get('/animals/:id', animalController.findById);
router.get('/users/:id/animals', animalController.findByUserId);
router.put('/animals/:id', needAuth, imageUploader.single('photo'), animalController.update);
router.delete('/animals/:id', needAuth, animalController.deleteByPk);

router.get('/ongs', ongController.findAll);
router.post('/ongs', needAuth, ongController.create);
router.get('/ongs/:id', ongController.findById);
router.put('/ongs/:id', needAuth, ongController.update);

router.get('/ongs/:id/users', ongController.findWorkers);
router.post('/ongs/:id/users', needAuth, ongController.assignWorker);
router.delete('/ongs/:id/users', needAuth, ongController.unassignWorker);

export default router;
