import express from "express";

import { tenderController } from "../dependencies";

const tenderRouter = express.Router();

tenderRouter.post(
  "/create",
  tenderController.createTender.bind(tenderController)
);
// userRouter.get(
//   "/",
//   tenderController.findUsers.bind(tenderController)
// );

export { tenderRouter };
