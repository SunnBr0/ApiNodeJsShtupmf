import { Appeal } from "@prisma/client";
import { IAppealRepository } from "../repositories/iAppealRepository";

type GetAppealsParams = {
  date?: string;
  from?: string;
  to?: string;
};

export class GetAppealsByDateTimeUseCase {
  constructor(private appealRepository: IAppealRepository) {}

  async execute(params: GetAppealsParams): Promise<Appeal[]> {
    const { date, from, to } = params;

    if (date && (from || to)) {
      throw new Error("VALIDATION_ERROR");
    }

    if ((from && !to) || (!from && to)) {
      throw new Error("VALIDATION_ERROR");
    }

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      if (isNaN(start.getTime())) {
        throw new Error("VALIDATION_ERROR");
      }

      const endExclusive = new Date(start);
      endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);

      return this.appealRepository.findMany({
        createdAtFrom: start,
        createdAtToExclusive: endExclusive,
      });
    }

    if (from && to) {
      const start = new Date(`${from}T00:00:00.000Z`);
      const endExclusive = new Date(`${to}T00:00:00.000Z`);

      if (isNaN(start.getTime()) || isNaN(endExclusive.getTime())) {
        throw new Error("VALIDATION_ERROR");
      }

      endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);

      if (start > endExclusive) {
        throw new Error("VALIDATION_ERROR");
      }

      return this.appealRepository.findMany({
        createdAtFrom: start,
        createdAtToExclusive: endExclusive,
      });
    }

    return this.appealRepository.findMany({});
  }
}