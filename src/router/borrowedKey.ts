import { Router } from 'express';
import { createBorrowedKey, getBorrowedKeys, getHistoryBorrowedKeys, updateBorrowedKey } from '../controllers/borrowedKey';
import { checkBorrowedKey, checkJwt } from '../middleware';
import { checkBodyBKey } from '../middleware/borrowedKey/checkBodyBKey';
import { hasRole } from '../middleware/validateRol';
import { validarCampos } from '../middleware/validarCampos';
import { validarLetrasNumeros } from '../helper/validaciones';

const router = Router();

//Ruta para obtener las llaves prestadas
router.get('/', getBorrowedKeys);
router.get('/history', getHistoryBorrowedKeys);

//Validamos que tenga un token valido
//Validamos que el usuario tenga el rol de administrador o operador
router.use(checkJwt, hasRole('ADMIN_ROLE', 'OPERATOR_ROLE'));

//Ruta para crear una llave prestada
router.post('/create', [
    validarCampos([
        validarLetrasNumeros
    ],[
        'key','service', 'operator', 'requestedBy'
    ]),
    checkBodyBKey,
],createBorrowedKey);

//Ruta para actualizar el estado de una llave prestada
router.put('/update/:id', checkBorrowedKey,updateBorrowedKey);

export default router;
