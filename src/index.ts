import express, { Router } from "express";
import bodyParser from "body-parser";
import { createAppeal } from "./controllers/createAppeal";
import { statusStartAppeal } from "./controllers/statusStartAppeal";
import { statusCompleteAppeal } from "./controllers/statusCompleteAppeal";
import { statusCancelAppeal } from "./controllers/statusCancelAppeal";
import { getAppealByDateTime } from "./controllers/getAppealByDateTime";
import { statusCancelAllAppeals } from "./controllers/statusCancelAllAppeals";

const app = express();
const routerVersion = Router();

app.use(bodyParser.json());
app.use("/api/v1", routerVersion);

routerVersion.post("/appeals", createAppeal);
routerVersion.patch("/appeals/:id/start", statusStartAppeal);
routerVersion.patch("/appeals/:id/complete", statusCompleteAppeal);
routerVersion.patch("/appeals/:id/cancel", statusCancelAppeal);
routerVersion.get("/appeals", getAppealByDateTime);
routerVersion.patch("/appeals/all-cancel", statusCancelAllAppeals);

app.listen(3000, () => {
  console.log("Сервер работает на порту 3000");
});
