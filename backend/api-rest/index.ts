import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';

import config from "./config.local";
import { tenderRouter } from "./tenders-api/Tender/tenderRouter";
import { userRouter } from "./users-api/userRouter";
import { notificationRouter } from "./notifications-api/notificationRouter";
import { tenderStagesRouters } from "./tenders-api/Stages/tendersStagesRouter";
import { tenderFilesRouters } from "./tenders-api/tender-files/tenderFileRouter";

function API() {
  const app = express();
  app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  app.use(bodyParser.json());
  app.use("/tenders", tenderRouter);
  app.use("/tenders/tender/stage", tenderStagesRouters);
  app.use("/tenders/file", tenderFilesRouters);
  app.use("/users", userRouter);
  app.use("/notifications", notificationRouter);


  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

API();
