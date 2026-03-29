import { Status } from "../../types/statusAppeal";
import { IAppealRepository } from "../repositories/iAppealRepository";

export class CreateAppealUseCase {
  constructor(private appealRepository: IAppealRepository) {}

  async execute(topic: string, text: string) {
    if (!topic || !text) throw new Error("VALIDATION_ERROR");

    const existing = await this.appealRepository.findByTopicAndText(
      topic,
      text,
    );
    if (existing) throw new Error("ALREADY_EXISTS");

    await this.appealRepository.create({ topic, text, status: Status.NEW });
  }
}
