import { Router } from "express";
import {
  cancelAllAppealsController,
  cancelAppealController,
  completeAppealController,
  createAppealController,
  getAppealByIdController,
  getAppealsByDateTimeController,
  startAppealController,
} from "../container";

const appealRoutes = Router();
appealRoutes.post("/appeals", createAppealController.handle);
appealRoutes.get("/appeals", getAppealsByDateTimeController.handle);
appealRoutes.get("/appeals/:id", getAppealByIdController.handle);
appealRoutes.patch("/appeals/:id/start", startAppealController.handle);
appealRoutes.patch("/appeals/:id/complete", completeAppealController.handle);
appealRoutes.patch("/appeals/:id/cancel", cancelAppealController.handle);
appealRoutes.patch("/appeals/all-cancel", cancelAllAppealsController.handle);

export { appealRoutes };
