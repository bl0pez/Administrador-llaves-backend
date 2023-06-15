import { Router } from 'express';
import { createKey, deleteItem, getItems, updateItem } from '../controllers/keyManager';
import { checkId, validateFile } from '../middleware';
import { hasRole } from '../middleware/validateRol';
import { checkJwt } from '../middleware/session';

const router = Router();

router.get('/', getItems);

router.use(checkJwt);
router.use(hasRole('ADMIN_ROLE'));

router.post('/', createKey);

router.put('/:id',[
    checkId,
],updateItem);


router.delete('/:id', [
    checkId,
],deleteItem);

export default router;