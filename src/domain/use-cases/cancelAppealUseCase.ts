import { Status } from "../../types/statusAppeal";
import { IAppealRepository } from "../repositories/iAppealRepository";

export class CancelAppealUseCase {
  constructor(private appealRepository: IAppealRepository) {}

  async execute(id: string, cancelReason?: string): Promise<void> {
    const appealId = Number(id);

    if (!Number.isInteger(appealId) || appealId <= 0) {
      throw new Error("VALIDATION_ERROR");
    }

    const appeal = await this.appealRepository.findById(appealId);

    if (!appeal) {
      throw new Error("NOT_FOUND");
    }

    if (appeal.status === Status.COMPLETED) {
      throw new Error("INVALID_STATUS");
    }

    await this.appealRepository.cancel(appealId, cancelReason);
  }
}
