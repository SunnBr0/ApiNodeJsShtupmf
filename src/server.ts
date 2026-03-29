import express, { Router } from "express";
import bodyParser from "body-parser";
import { appealRoutes } from "./main/routes/appealRoutes";
import dotenv from "dotenv";

dotenv.config({ path: '../env' });

const app = express();
const routerVersion = Router();

app.use(bodyParser.json());
app.use("/api/v1", routerVersion);
routerVersion.use(appealRoutes);

const port = process.env.PORT_SERVER || 3000;

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});