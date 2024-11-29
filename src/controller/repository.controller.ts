import { NextFunction, Request, Response } from 'express';
import { formatSection } from '../utils/formatSection';
import config from '../config';

export const getHello = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(200).send({ message: 'Hello world!' });
};

export const postWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log('skdkh');

    // return res.status(200).send({ message: '나와' });
    const payload = req.body;

    const repositoryName = payload.repository.name;
    const repositoryFullName = payload.repository.full_name;

    const commits = payload.head_commit;
    const committer = commits.committer.name || 'GitHub';
    const commitMessage = commits.message;
    const url = commits.url;

    const added = commits.added;
    const modified = commits.modified;
    const removed = commits.removed;

    const addedSection =
      added.length > 0 ? `\n\n\n${formatSection(added, '📣 Added Files')}` : '';
    const modifiedSection =
      modified.length > 0
        ? `\n\n\n${formatSection(modified, '✨ Changed Files')}`
        : '';
    const removedSection =
      removed.length > 0
        ? `\n\n\n${formatSection(removed, '🔥 Removed Files')}`
        : '';

    const relevantLink = url ? `\n\n\n🔗 Relevant Links\n${url}` : '';

    const message = `
    \n\n[✅ Received a Webhook - ${config.version}]\n\nRepository: ${repositoryFullName}\n\nCommit by 🧑‍💻${committer}\n[${commitMessage}]${addedSection}${modifiedSection}${removedSection}${relevantLink}
  `;

    return res.status(200).send({ message });

    // TODO: send message
  } catch (error) {
    next(error);
  }
};
