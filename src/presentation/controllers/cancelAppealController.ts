import { Request, Response } from "express";
import { CancelAppealUseCase } from "../../domain/use-cases/cancelAppealUseCase";

export class CancelAppealController {
  constructor(private cancelAppealUseCase: CancelAppealUseCase) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { cancelReason } = req.body;

      await this.cancelAppealUseCase.execute(id, cancelReason);

      return res.status(200).json({
        message: "Апелляция помечена как отмененная",
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
          error: "Заполненная апелляция не может быть отменена",
        });
      }

      return res.status(500).json({
        error: "Внутренняя ошибка сервера",
      });
    }
  };
}
