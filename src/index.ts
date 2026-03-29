import express, { Router } from "express";
import bodyParser from "body-parser";
// import { createAppeal } from "./controllers/createAppeal";
import { appealRoutes } from "./main/routes/appealRoutes";
import { statusCompleteAppeal } from "./controllers/statusCompleteAppeal";
// import { statusCancelAppeal } from "./controllers/statusCancelAppeal";
// import { statusCancelAllAppeals } from "./controllers/statusCancelAllAppeals";
const app = express();
const routerVersion = Router();

app.use(bodyParser.json());
app.use("/api/v1", routerVersion);
routerVersion.use(appealRoutes)


routerVersion.patch("/appeals/:id/complete", statusCompleteAppeal);
// routerVersion.patch("/appeals/:id/cancel", statusCancelAppeal);
// routerVersion.patch("/appeals/all-cancel", statusCancelAllAppeals);

app.listen(3000, () => {
  console.log("Сервер работает на порту 3000");
});
