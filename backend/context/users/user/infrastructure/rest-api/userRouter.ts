import express from "express";

import { createUserController } from "../dependencies";

const userRouter = express.Router();

userRouter.post(
  "/create",
  createUserController.createUser.bind(createUserController)
);

export { userRouter };
