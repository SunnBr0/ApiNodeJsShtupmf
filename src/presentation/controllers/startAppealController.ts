import { StartAppealUseCase } from "../../domain/use-cases/startAppealUseCase";
import { Request, Response } from "express";
export class StartAppealController {
  constructor(private startAppealUseCase: StartAppealUseCase) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await this.startAppealUseCase.execute(id);

      return res.status(200).json({
        message: "Статус обновлен на 'В работе'",
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "VALIDATION_ERROR") {
        return res.status(400).json({
          error: "Некорректный id",
        });
      }

      if (error instanceof Error && error.message === "NOT_FOUND") {
        return res.status(404).json({
          error: "Обращение не найдено",
        });
      }

      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
}
