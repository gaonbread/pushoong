export class GithubService {
  static async formatWebhookMessage(payload: any) {
    const { repository, sender, commits, ref } = payload;

    const repositoryName = repository.name;
    const repositoryFullName = repository.full_name;

    return {
      branch: ref,
      repositoryName: repositoryFullName,
      commits,
    };
  }
}
