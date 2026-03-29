import { Appeal } from "@prisma/client";
import { IAppealRepository } from "../repositories/iAppealRepository";

export class GetAppealByIdUseCase {
  constructor(private appealRepository: IAppealRepository) {}

  async execute(id: string): Promise<Appeal> {
    const appealId = Number(id);

    if (!Number.isInteger(appealId) || appealId <= 0) {
      throw new Error("VALIDATION_ERROR");
    }

    const appeal = await this.appealRepository.findById(appealId)

    if(!appeal){
        throw new Error("NOT_FOUND")
    }

    return appeal
  }
}
