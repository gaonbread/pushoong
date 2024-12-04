import Repository, { IRepository } from '../@model/repository';

export class RepositoryService {
  /** 레포지토리 찾기 */
  static async findRepository(repositoryFullName: string) {
    const repository = await Repository.findOne(
      { name: repositoryFullName },
      null,
      { readConcern: { level: 'majority' } }, // Read concern 설정
    );

    return repository;
  }

  static async findBranchInclude(
    branch: string,
    repository: IRepository | null,
  ) {
    if (!repository) {
      return { isBranchIncluded: false, branchName: '' };
    }

    const branchName = branch.replace('refs/heads/', ''); // Extract branch name
    const isBranchIncluded = repository.branch.includes(branchName);

    return { isBranchIncluded, branchName };
  }
}
