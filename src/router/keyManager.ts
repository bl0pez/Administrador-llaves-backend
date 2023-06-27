import { Router } from 'express';
import { createKey, createKeyCloudinary, deleteItem, getItems, updateItem, updateItemCloudinary } from '../controllers/keyManager';
import { checkId, validateFile } from '../middleware';
import { hasRole } from '../middleware/validateRol';
import { checkJwt } from '../middleware/session';
import { validarCampos } from '../middleware/validarCampos';

const router = Router();

router.get('/', getItems);

router.use(checkJwt);
router.use(hasRole('ADMIN_ROLE'));

router.post('/', [
    validarCampos('name','description', 'image'),
],createKeyCloudinary);

router.put('/:id',[
    checkId,
],updateItemCloudinary);


router.delete('/:id', [
    checkId,
],deleteItem);

export default router;