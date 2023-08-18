import bodyParser from "body-parser";
import express from "express";

import { config } from "./context/shared/infrastructure/config";
import { tenderRouter } from "./context/tenders/tender/infrastructure/rest-api/tenderRouter";

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/tenders", tenderRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
