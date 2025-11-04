import { Router } from 'express';
import { getPhrasebook } from '../controllers/phrasebookController.js';

const router = Router();

router.get('/', getPhrasebook);

export default router;
