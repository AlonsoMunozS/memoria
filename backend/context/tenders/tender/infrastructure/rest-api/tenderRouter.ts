import express from "express";

import { createTenderController, findByIdTenderController, removeTenderController } from "../dependencies";
import { findTendersController } from "../dependencies";
import { FindByIdTenderController } from "./findByIdTenderController";

const tenderRouter = express.Router();

tenderRouter.post(
  "/create",
  createTenderController.createTender.bind(createTenderController)
);

tenderRouter.get(
  "/",
  findTendersController.findTenders.bind(findTendersController)
);

tenderRouter.get(
  "/tender/:tenderId",
  findByIdTenderController.findByIdTender.bind(findByIdTenderController)
);

tenderRouter.delete(
  "/tender/remove/:tenderId",
  removeTenderController.removeTender.bind(removeTenderController)
);

export { tenderRouter };
