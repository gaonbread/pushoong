import express from 'express';
import { getHello, postWebhook } from '../controller/repository.controller';

const router = express.Router();

router.get('/', getHello);
router.post('/', postWebhook);

export default router;
