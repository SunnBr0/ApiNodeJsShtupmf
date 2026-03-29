import { IAppealRepository } from "../repositories/iAppealRepository";

export class CancelAllAppealsUseCase {
  constructor(private appealRepository: IAppealRepository) {}

  async execute(): Promise<void> {
    const count = await this.appealRepository.cancelAllInProgress();

    if (count === 0) {
      throw new Error("NOT_FOUND");
    }
  }
} 
