import { Request, Response } from "express";
import { CompleteAppealUseCase } from "../../domain/use-cases/completeAppealUseCase";

export class CompleteAppealController {
  constructor(private completeAppealUseCase: CompleteAppealUseCase) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { resolutionText } = req.body;

      await this.completeAppealUseCase.execute(id, resolutionText);

      return res.status(200).json({
        message: "Апелляция помечена как завершенная",
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "VALIDATION_ERROR") {
        return res.status(400).json({
          error: "Недействительный идентификатор апелляции",
        });
      }

      if (error instanceof Error && error.message === "NOT_FOUND") {
        return res.status(404).json({
          error: "Апелляция не найдена",
        });
      }

      if (error instanceof Error && error.message === "INVALID_STATUS") {
        return res.status(400).json({
          error: "Отмененная апелляция не может быть подана",
        });
      }

      return res.status(500).json({
        error: "Внутренняя ошибка сервера",
      });
    }
  };
}
