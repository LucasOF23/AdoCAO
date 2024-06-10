import express from "express";
import authController from "../controllers/auth.controller.js";
import addAuthRoutes from "./auth.routes.js";
import addAnimalsRoutes from "./animals.routes.js";
import addOngsRoutes from "./ongs.routes.js";
import { addCityRoutes, addAnimalSpecieRoutes, addAnimalTagRoutes } from "./extra.routes.js";

const router = express.Router();
const needAuth = authController.validateToken;

addAuthRoutes(router, needAuth);
addAnimalsRoutes(router, needAuth);
addOngsRoutes(router, needAuth);
addCityRoutes(router);
addAnimalSpecieRoutes(router, needAuth);
addAnimalTagRoutes(router, needAuth);

export default router;
