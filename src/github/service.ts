export class GithubService {
  static async formatWebhookMessage(payload: any) {
    const { repository, sender, commits, ref, head_commit } = payload;

    console.log('payload', payload);

    const repositoryName = repository.name;
    const repositoryFullName = repository.full_name;

    return {
      branch: ref,
      repositoryName: repositoryFullName,
      commits: head_commit,
    };
  }
}
