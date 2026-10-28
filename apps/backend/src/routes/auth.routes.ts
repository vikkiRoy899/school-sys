import { Router } from 'express';
import { login, redeemOtr } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/redeem-otr', redeemOtr);

export default router;