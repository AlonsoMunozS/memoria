import bodyParser from "body-parser";
import express from "express";

import { config } from "./context/shared/infrastructure/config";
import { tenderRouter } from "./context/tenders/tender/infrastructure/rest-api/tenderRouter";
import { userRouter } from "./context/users/user/infrastructure/rest-api/userRouter";
import { pdfRouter } from "./context/reports/infrastructure/rest-api/pdfRouter";

function API() {
  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  app.use(bodyParser.json());
  app.use("/tenders", tenderRouter);
  app.use("/users", userRouter);
  app.use("/pdf", pdfRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

API();
