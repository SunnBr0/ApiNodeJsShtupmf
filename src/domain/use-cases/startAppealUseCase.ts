import { Status } from "../../service/statusAppeal";
import { IAppealRepository } from "../repositories/iAppealRepository";

export class StartAppealUseCase {
  constructor(private appealRepository: IAppealRepository) {}

  async execute(id: string): Promise<void> {
    const appealId = Number(id);

    if (!Number.isInteger(appealId) || appealId <= 0) {
      throw new Error("VALIDATION_ERROR");
    }

    const appeal = await this.appealRepository.findById(appealId);

    if (!appeal) {
      throw new Error("NOT_FOUND");
    }

    await this.appealRepository.updateStatus(appealId, Status.IN_PROGRESS);
  }
}
