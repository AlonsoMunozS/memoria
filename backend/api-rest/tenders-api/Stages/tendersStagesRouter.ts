import express from "express";

import { createTenderStageController, findStageByTenderController } from "../stagesDependencies";

const tenderStagesRouters = express.Router();

tenderStagesRouters.post(
  "/create",
  createTenderStageController.createTenderStage.bind(createTenderStageController)
);

tenderStagesRouters.get(
  "/:tenderId/",
  findStageByTenderController.findStagesByTender.bind(findStageByTenderController)
);

export { tenderStagesRouters };
