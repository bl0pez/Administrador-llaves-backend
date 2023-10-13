import { Router } from "express";
import { loginCtrl, registerCtrl, validateCtrl } from "../controllers/auth";
import { checkJwt } from "../middleware";
import { validarCampos } from "../middleware/validarCampos";
import { validarLetrasNumeros } from "../helper/validaciones";

const router = Router();

//Ruta de validar sesion de usuario
router.get("/validate", [checkJwt], validateCtrl);

//Ruta de login de usuario
router.post("/login", loginCtrl);

//Ruta de registro de usuario
router.post("/register", [], registerCtrl);

export default router;
