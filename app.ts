import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import { formatSection } from './utils/formatSection';
import { sendTelegram } from './utils/sendTelegram';

const app = express();

app.use(bodyParser.json());

// IP 주소 확인
app.use((req: Request, res: Response, next: NextFunction) => {
  const clientIP: any = req.ip;
  const allowedIP = config.allow_ip.split(',');

  if (allowedIP?.includes(clientIP)) {
    next();
  } else {
    res.status(403).send('Access Denied'); // 접근 거부
  }
});

// error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // ❌
  res.status(500).send('Server Error');
});

app.post('/webhook', (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const repositoryName = payload.repository.full_name;
    const commits = payload.head_commit;
    const committer = commits.committer.name;
    const commitMessage = commits.message;

    const added = commits.added;
    const modified = commits.modified;
    const removed = commits.removed;

    const addedSection = formatSection(added, '📣 Added Files');
    const modifiedSection = formatSection(modified, '✨ Changed Files');
    const removedSection = formatSection(removed, '🔥 Removed Files');

    // const template = `[✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryName}\nCommit: Commit by 🧑‍💻${committer}: [${commitMessage}]\n\n${addedSection}\n\n${modifiedSection}\n\n${removedSection}`;

    sendTelegram(`
      \n\n[✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryName}\nCommit by 🧑‍💻${committer}: [${commitMessage}]\n\n${addedSection}\n\n${modifiedSection}\n\n${removedSection}\n\n
    `);

    res.status(200).send('Webhook received!');
  } catch (error) {
    next(error);
  }
});

// 서버 시작
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
