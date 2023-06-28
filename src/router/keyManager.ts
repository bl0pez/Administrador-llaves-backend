import { Router } from 'express';
import { createKey, createKeyCloudinary, deleteItem, getItems, updateItem, updateItemCloudinary } from '../controllers/keyManager';
import { checkId, validateFile } from '../middleware';
import { hasRole } from '../middleware/validateRol';
import { checkJwt } from '../middleware/session';
import { validarCampos } from '../middleware/validarCampos';
import { validarLetrasNumeros } from '../helper/validaciones';

const router = Router();

router.get('/', getItems);

//Validamos que tenga un token valido
//Validamos que el usuario tenga el rol de administrador
router.use(checkJwt, hasRole('ADMIN_ROLE'));

router.delete('/:id', [
    checkId,
],deleteItem);

//Validamos que los campos no esten vacios y que solo sean letras y numeros
router.use(validarCampos([
    validarLetrasNumeros
], [
    'name', 'description', 'image'
]))

//Ruta para crear una llave
router.post('/', [
    validateFile
],createKeyCloudinary);

router.put('/:id',[
    checkId,
],updateItemCloudinary);



export default router;