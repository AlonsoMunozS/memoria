import express from "express";

import { createTenderController, findByIdTenderController, removeTenderController, updateTenderController } from "../dependencies";
import { findTendersController } from "../dependencies";

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

tenderRouter.put(
  "/tender/update/:tenderId",
  updateTenderController.updateTender.bind(updateTenderController)
);

tenderRouter.delete(
  "/tender/remove/:tenderId",
  removeTenderController.removeTender.bind(removeTenderController)
);

export { tenderRouter };
