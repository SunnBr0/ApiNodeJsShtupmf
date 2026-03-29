import { Request, Response } from "express";
import { CreateAppealUseCase } from "../../domain/use-cases/createAppealUseCase";

export class CreateAppealController {
  constructor(private createAppealUseCase: CreateAppealUseCase) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { topic, text } = req.body;
      await this.createAppealUseCase.execute(topic, text);
      return res.sendStatus(201)
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "VALIDATION_ERROR") return res.status(400).json({ error: "..." });
      if (error instanceof Error && error.message === "ALREADY_EXISTS") return res.status(409).json({ error: "..." });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
