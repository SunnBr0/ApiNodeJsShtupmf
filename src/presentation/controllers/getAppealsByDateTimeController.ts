import { Request, Response } from "express";
import { GetAppealsByDateTimeUseCase } from "../../domain/use-cases/getAppealsByDateTimeUseCase";

export class GetAppealsByDateTimeController {
  constructor(
    private getAppealsByDateTimeUseCase: GetAppealsByDateTimeUseCase,
  ) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { date, from, to } = req.query;

      const appeals = await this.getAppealsByDateTimeUseCase.execute({
        date: date as string | undefined,
        from: from as string | undefined,
        to: to as string | undefined,
      });

      return res.status(200).json(appeals);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "VALIDATION_ERROR") {
        return res.status(400).json({
          error: "Некорректные параметры date/from/to",
        });
      }
      return res.status(500).json({
        error: "Внутренняя ошибка сервера",
      });
    }
  };
}
