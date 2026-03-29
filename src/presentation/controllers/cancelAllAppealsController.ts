import { Request, Response } from "express";
import { CancelAllAppealsUseCase } from "../../domain/use-cases/cancelAllAppealsUseCase";

export class CancelAllAppealsController {
  constructor(private cancelAllAppealsUseCase: CancelAllAppealsUseCase) {}

  handle = async (_req: Request, res: Response) => {
    try {
      await this.cancelAllAppealsUseCase.execute();

      return res.status(200).json({
        message: "Все поданные апелляции были отменены",
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "NOT_FOUND") {
        return res.status(404).json({
          error: "Не было обнаружено ни одной апелляции, находящейся в стадии рассмотрения",
        });
      }

      return res.status(500).json({
        error: "Внутренняя ошибка сервера",
      });
    }
  };
}
