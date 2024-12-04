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

export const formatMessageForSlack = async ({
  repositoryName,
  branch,
  commits,
}: {
  repositoryName: string;
  branch: string;
  commits: any;
}) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString(); // 예: '2023-10-12'
  const formattedTime = now.toLocaleTimeString(); // 예: '10:30:15 AM'

  const commitMessage = commits?.message;
  const url = commits?.url;

  const committer = commits?.committer?.name || 'GitHub';

  const added = commits?.added;
  const modified = commits?.modified;
  const removed = commits?.removed;

  const addedSection =
    added?.length > 0 ? `\n\n${formatSection(added, '📣 Added Files')}` : '';
  const modifiedSection =
    modified?.length > 0
      ? `\n\n${formatSection(modified, '✨ Changed Files')}`
      : '';
  const removedSection =
    removed?.length > 0
      ? `\n\n${formatSection(removed, '🔥 Removed Files')}`
      : '';

  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `\n\n${formattedDate} ${formattedTime}\n\n[ *${branch}* branch가 업데이트 되었습니다 ]\nRepository: *${repositoryName}*\n\nCommit by 🧑‍💻${committer}\n\ncommit message: ${commitMessage}`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${addedSection}${modifiedSection}${removedSection}`,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '🔗 Relevant Links',
            emoji: true,
          },
          value: 'click_me_123',
          url: url,
        },
      ],
    },
  ];

  const jsonString = JSON.stringify(blocks);
  const message = encodeURIComponent(jsonString);

  return message;
};
