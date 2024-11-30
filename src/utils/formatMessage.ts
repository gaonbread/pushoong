import config from '../config';
import { formatSection } from './formatSection';

export const formatMessage = async ({
  repositoryName,
  branch,
  commits,
}: {
  repositoryName: string;
  branch: string;
  commits: any;
}) => {
  const commitMessage = commits?.message;
  const url = commits?.url;

  const committer = commits?.committer?.name || 'GitHub';

  const added = commits?.added;
  const modified = commits?.modified;
  const removed = commits?.removed;

  const addedSection =
    added?.length > 0 ? `\n\n\n${formatSection(added, '📣 Added Files')}` : '';
  const modifiedSection =
    modified?.length > 0
      ? `\n\n\n${formatSection(modified, '✨ Changed Files')}`
      : '';
  const removedSection =
    removed?.length > 0
      ? `\n\n\n${formatSection(removed, '🔥 Removed Files')}`
      : '';

  const relevantLink = url ? `\n\n\n🔗 Relevant Links\n${url}` : '';

  return `[✅ Received a Webhook - ${config.version}]\nbranch: ${branch}\nRepository: ${repositoryName}\n\nCommit by 🧑‍💻${committer}\n[${commitMessage}]${addedSection}${modifiedSection}${removedSection}${relevantLink}`;
};
