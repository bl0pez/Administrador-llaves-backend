import { Router } from 'express';
import { createBorrowedKey, getBorrowedKeys, getHistoryBorrowedKeys, updateBorrowedKey } from '../controllers/borrowedKey';
import { checkBorrowedKey } from '../middleware';
import { checkBodyBKey } from '../middleware/borrowedKey/checkBodyBKey';

const router = Router();

//Ruta para obtener las llaves prestadas
router.get('/', getBorrowedKeys);

router.get('/history', getHistoryBorrowedKeys);

//Ruta para crear una llave prestada
router.post('/create', [
    checkBodyBKey,
],createBorrowedKey);

//Ruta para actualizar el estado de una llave prestada
router.put('/update/:id', [
    checkBorrowedKey,    
],updateBorrowedKey);

export default router;
