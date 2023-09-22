import express from "express";

import { createUserController, loginUserController } from "../dependencies";


const userRouter = express.Router();

userRouter.post(
  "/create",
  createUserController.createUser.bind(createUserController)
);

userRouter.post(
  "/login",
  loginUserController.loginUser.bind(loginUserController)
);

export { userRouter };
