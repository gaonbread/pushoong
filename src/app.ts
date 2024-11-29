import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import requestIp from 'request-ip';
import config from './config';
import router from './routes';
import './@model/index';

const app = express();

const corsOption = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOption));
app.use(bodyParser.json());

mongoose
  .connect(config.mongo_uri)
  .then(() => console.log('✅ Connected to Mongo'))
  .catch((err) => console.error('❌ Not Connected to Mongo: ', err));

// IP 주소 확인
app.use((req: Request, res: Response, next: NextFunction) => {
  const clientIP: any = requestIp.getClientIp(req);

  console.log('🧑‍💻 client IP: ', clientIP);

  next();
});

// error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Server Error');
});

app.use('/', router);

// 서버 시작
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
