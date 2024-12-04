import { NextFunction, Request, Response } from 'express';
import { GithubService } from '../github/service';
import { formatMessage, formatMessageForSlack } from '../utils/formatMessage';
import { sendSlack } from '../utils/sendSlack';
import { RepositoryService } from './service';

export class RepositoryController {
  static async getHello(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send({ message: 'Hello world!' });
    } catch (error) {
      next(error);
    }
  }

  // webhook 전송
  static async WebhookPush(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      console.log('payload => ', payload);

      const { repositoryName, branch, commits } =
        await GithubService.formatWebhookMessage(payload);

      // 레포지토리 맞는 이름 찾기
      const repository = await RepositoryService.findRepository(repositoryName);

      // push alert 브랜치 포함 여부 찾기
      const branchInfo = await RepositoryService.findBranchInclude(
        branch,
        repository,
      );

      const message = await formatMessageForSlack({
        repositoryName,
        branch: branchInfo.branchName,
        commits,
      });

      if (branchInfo.isBranchIncluded) {
        if (repository?.meta.slack) {
          sendSlack({
            token: repository.meta.slack.token,
            channel_id: repository.meta.slack.channel_id,
            message: message,
          });
        }
        if (repository?.meta.telegram) {
          // console.log('telegram 존재');
        }
      }

      return res.status(200).send({
        status: true,
        message: 'success',
      });
    } catch (error) {
      next(error);
    }
  }
}
