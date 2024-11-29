import config from '../config';
import { formatSection } from '../utils/formatSection';

export class GithubService {
  static async formatWebhookMessage(payload: any) {
    const { repository, sender, commits } = payload;

    const repositoryName = repository.name;
    const repositoryFullName = repository.full_name;

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

    return {
      repositoryName,
      message,
    };
  }
}
