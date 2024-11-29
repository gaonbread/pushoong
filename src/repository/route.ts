import express from 'express';
import { RepositoryController } from './controller';

const router = express.Router();

router.get('/', RepositoryController.getHello);
router.post('/webhook', RepositoryController.handleWebhook);

export default router;
