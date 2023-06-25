import { Router } from 'express';
import { keyHistoryCtrl } from '../controllers/keyHistory';

const router = Router();

router.get('/', keyHistoryCtrl);

export default router;