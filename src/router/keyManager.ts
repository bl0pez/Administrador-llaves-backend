import { Router } from 'express';
import { createKey, deleteItem, getItems, updateItem } from '../controllers/keyManager';
import { checkId, validateFile } from '../middleware';

const router = Router();

router.post('/', [
    validateFile,
],createKey);

router.put('/:id',[
    checkId,
],updateItem);


router.get('/', getItems);
router.delete('/:id', deleteItem);

export default router;