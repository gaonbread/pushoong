import { NextFunction, Request, Response } from 'express';

export class RepositoryController {
  static async getHello(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send({ message: 'Hello world!' });
    } catch (error) {
      next(error);
    }
  }

  // webhook 전송
  static async handleWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;

      console.log('req:::::', req);
      console.log('payload:::::', payload);

      // const { repositoryName, message } =
      //   await GithubService.formatWebhookMessage(payload);

      // console.log(repositoryName, message);

      // return res.status(200).send({ repositoryName, message });
      return res.status(200).send({
        body: payload,
      });
    } catch (error) {
      next(error);
    }
  }
}
