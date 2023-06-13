import { Router } from "express";
import { loginCtrl, registerCtrl, validateCtrl } from "../controllers/auth";
import { checkJwt } from "../middleware";

const router = Router();

//Ruta de registro

//Ruta de login de usuario
router.post('/login', loginCtrl);

//Ruta de registro de usuario
router.post('/register', registerCtrl);

//Ruta de validar sesion de usuario
router.get('/validate', [
    checkJwt
] , validateCtrl);


export default router;