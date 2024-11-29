import express from 'express';
import repositoryRouter from './repository/route';

const router = express.Router();

router.use('/', repositoryRouter);

export default router;
