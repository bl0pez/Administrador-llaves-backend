import { Router } from 'express';
import { createKey, deleteItem, getItems, updateItem } from '../controllers/keyManager';
import multerMiddleware from '../middleware/uploadFile';

const router = Router();

router.post('/', createKey);
router.put('/:id', multerMiddleware.single('image'), updateItem);
router.get('/', getItems);
router.delete('/:id', deleteItem);

export default router;