import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import { formatSection } from './utils/formatSection';
import { sendTelegram } from './utils/sendTelegram';

const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    // repository name
    const repositoryName = payload.repository.full_name;

    // commit
    const commits = payload.head_commit;

    // committer
    const committer = commits.committer.name;

    // commit message
    const commitMessage = commits.message;

    const added = commits.added;
    const modified = commits.modified;
    const removed = commits.removed;

    const addedSection = formatSection(added, '📣 Added Files');
    const modifiedSection = formatSection(modified, '✨ Changed Files');
    const removedSection = formatSection(removed, '🔥 Removed Files');

    // const template = `[✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryName}\nCommit: Commit by 🧑‍💻${committer}: [${commitMessage}]\n\n${addedSection}\n\n${modifiedSection}\n\n${removedSection}`;

    sendTelegram(`
      [✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryName}\nCommit: Commit by 🧑‍💻${committer}: [${commitMessage}]\n\n${addedSection}\n\n${modifiedSection}\n\n${removedSection}\n\n
    `);

    res.status(200).send('Webhook received!');
  } catch (error) {
    next(error);
  }
});

// error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // ❌
  res.status(500).send('Server Error');
});

// 서버 시작
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
