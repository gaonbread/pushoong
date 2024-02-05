import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import requestIp from 'request-ip';

import config from './config';
import Repository from './models/repository';
import { formatSection } from './utils/formatSection';
import { sendTelegram } from './utils/sendTelegram';

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

app.get('/', (req, res, next) => {
  return res.status(200).send({ message: 'Hello World' });
});

app.post(
  '/webhook',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;

      const repositoryName = payload.repository.full_name;
      const commits = payload.head_commit;
      const committer = commits.committer.name;
      const commitMessage = commits.message;

      const repository = await Repository.findOne({ name: repositoryName });

      const added = commits.added;
      const modified = commits.modified;
      const removed = commits.removed;

      const addedSection = formatSection(added, '📣 Added Files');
      const modifiedSection = formatSection(modified, '✨ Changed Files');
      const removedSection = formatSection(removed, '🔥 Removed Files');

      if (repository) {
        //   `
        //   \n\n[✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryName}\n\nCommit by 🧑‍💻${committer}\n[${commitMessage}]\n\n${addedSection}\n\n${modifiedSection}\n\n${removedSection}\n\n
        // `,

        sendTelegram(
          repository?.chat_id,
          `
          \n\n[✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryName}\n\nCommit by 🧑‍💻${committer}\n[${commitMessage}]\n\n${addedSection}\n\n${modifiedSection}\n\n${removedSection}\n\n
        `,
        );
        res.status(200).send('Webhook received!');
      } else {
        sendTelegram(
          config.telegram.chat_id,
          `❌ Failed to send webhook \n\n ${repositoryName}`,
        );
        console.log(`❌ Failed to send webhook \n\n ${repositoryName}`);
        res.status(404).send('Repository not found'); // 저장소를 찾을 수 없는 경우
      }
    } catch (error) {
      next(error);
    }
  },
);

// 서버 시작
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
