import { CreateAppealUseCase } from "../domain/use-cases/createAppealUseCase";
import { CancelAllAppealsUseCase } from "../domain/use-cases/cancelAllAppealsUseCase";
import { CancelAppealUseCase } from "../domain/use-cases/cancelAppealUseCase";
import { CompleteAppealUseCase } from "../domain/use-cases/completeAppealUseCase";
import { GetAppealByIdUseCase } from "../domain/use-cases/getAppealByIdUseCase";
import { GetAppealsByDateTimeUseCase } from "../domain/use-cases/getAppealsByDateTimeUseCase";
import { StartAppealUseCase } from "../domain/use-cases/startAppealUseCase";
import { PrismaAppealRepository } from "../infrastructure/database/prismaAppealRepository";
import { CancelAllAppealsController } from "../presentation/controllers/cancelAllAppealsController";
import { CancelAppealController } from "../presentation/controllers/cancelAppealController";
import { CompleteAppealController } from "../presentation/controllers/completeAppealController";
import { CreateAppealController } from "../presentation/controllers/createAppealController";
import { GetAppealByIdController } from "../presentation/controllers/getAppealByIdController";
import { GetAppealsByDateTimeController } from "../presentation/controllers/getAppealsByDateTimeController";
import { StartAppealController } from "../presentation/controllers/startAppealController";

const appealRepository = new PrismaAppealRepository();

const createAppealUseCase = new CreateAppealUseCase(appealRepository);
const getAppealsByDateTimeUseCase = new GetAppealsByDateTimeUseCase(
  appealRepository,
);
const getAppealByIdUseCase = new GetAppealByIdUseCase(appealRepository);
const startAppealUseCase = new StartAppealUseCase(appealRepository);
const completeAppealUseCase = new CompleteAppealUseCase(appealRepository);
const cancelAppealUseCase = new CancelAppealUseCase(appealRepository);
const cancelAllAppealsUseCase = new CancelAllAppealsUseCase(appealRepository);

export const createAppealController = new CreateAppealController(
  createAppealUseCase,
);
export const getAppealsByDateTimeController =
  new GetAppealsByDateTimeController(getAppealsByDateTimeUseCase);

export const getAppealByIdController = new GetAppealByIdController(
  getAppealByIdUseCase,
);
export const startAppealController = new StartAppealController(
  startAppealUseCase,
);
export const completeAppealController = new CompleteAppealController(
  completeAppealUseCase,
);
export const cancelAppealController = new CancelAppealController(
  cancelAppealUseCase,
);
export const cancelAllAppealsController = new CancelAllAppealsController(
  cancelAllAppealsUseCase,
);
