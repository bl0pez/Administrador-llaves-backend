import { Router } from 'express';
import { createBorrowedKey, getBorrowedKeys } from '../controllers/borrowedKey';

const router = Router();

//Ruta para obtener las llaves prestadas
router.get('/', getBorrowedKeys);

//Ruta para crear una llave prestada
router.post('/create', createBorrowedKey);

export default router;
