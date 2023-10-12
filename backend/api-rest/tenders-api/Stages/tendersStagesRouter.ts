import express from "express";

import { createTenderStageController } from "../stagesDependencies";

const tenderStagesRouters = express.Router();

tenderStagesRouters.post(
  "/create",
  createTenderStageController.createTenderStage.bind(createTenderStageController)
);

export { tenderStagesRouters };
