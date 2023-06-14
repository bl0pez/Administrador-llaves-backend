import { Router } from 'express';
import { createKey, deleteItem, getItems, updateItem } from '../controllers/keyManager';
import { checkId, checkJwt, validateFile } from '../middleware';

const router = Router();

router.get('/', getItems);


router.use( checkJwt );

router.post('/', [
    validateFile,
],createKey);

router.put('/:id',[
    checkId,
],updateItem);


router.delete('/:id', [
    checkId,
],deleteItem);

export default router;