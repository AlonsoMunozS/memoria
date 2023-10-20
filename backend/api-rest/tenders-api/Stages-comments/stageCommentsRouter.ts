import express from "express";

import { createStageCommentController, findCommentByStageController } from "../stagesCommentsDependencies";
import { findStageByTenderController } from "../stagesDependencies";

const stageCommentsRouter = express.Router();

stageCommentsRouter.post(
  "/create",
  createStageCommentController.createStageComment.bind(createStageCommentController)
);

stageCommentsRouter.get(
  "/:stageId",
  findCommentByStageController.findStageComments.bind(findCommentByStageController)
);

export { stageCommentsRouter };
