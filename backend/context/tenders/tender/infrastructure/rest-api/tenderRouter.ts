import express from "express";

import { createTenderController } from "../dependencies";
import { findTenderController } from "../dependencies";

const tenderRouter = express.Router();

tenderRouter.post(
  "/create",
  createTenderController.createTender.bind(createTenderController)
);
tenderRouter.get(
  "/",
  findTenderController.findTenders.bind(findTenderController)
);

export { tenderRouter };
