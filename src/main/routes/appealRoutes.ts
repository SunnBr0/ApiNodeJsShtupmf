import { Router } from "express";
import { createAppealController, getAppealByIdController, getAppealsByDateTimeController, startAppealController,  } from "../container";

const appealRoutes = Router()
appealRoutes.post("/appeals", createAppealController.handle);
appealRoutes.get("/appeals", getAppealsByDateTimeController.handle);
appealRoutes.get("/appeals/:id", getAppealByIdController.handle);
appealRoutes.patch("/appeals/:id/start", startAppealController.handle);


export {appealRoutes}