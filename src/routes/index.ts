import express from 'express';
import repositoryRouter from './repository';

const router = express.Router();

router.use('/webhook', repositoryRouter);

export default router;
