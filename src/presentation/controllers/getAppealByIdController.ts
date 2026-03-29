import { Request, Response } from "express";
import { GetAppealByIdUseCase } from "../../domain/use-cases/getAppealByIdUseCase";

export class GetAppealByIdController {
  constructor(private getAppealByIdUseCase: GetAppealByIdUseCase) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const appeal = await this.getAppealByIdUseCase.execute(id);
      return res.status(200).json(appeal);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "VALIDATION_ERROR") {
        return res.status(400).json({ error: "Некорректный id" });
      }

      if (error instanceof Error && error.message === "NOT_FOUND") {
        return res.status(404).json({ error: "Обращение не найдено" });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
