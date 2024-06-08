import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", authController.register);
router.post("/signin", authController.login);

// TODO: RETIRAR ISSO DAQUI, É SÓ PARA TESTAR
router.get("/users", authController.findAll);

export default router;
