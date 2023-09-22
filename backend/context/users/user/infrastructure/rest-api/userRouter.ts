import express from "express";

import { createUserController, findByIdUserController, loginUserController } from "../dependencies";
import { FindByIdUserController } from "./findByIdUserController";


const userRouter = express.Router();

userRouter.post(
  "/create",
  createUserController.createUser.bind(createUserController)
);

userRouter.post(
  "/login",
  loginUserController.loginUser.bind(loginUserController)
);

userRouter.get(
  "/user/:userId",
  findByIdUserController.findByIdUser.bind(findByIdUserController)
);

export { userRouter };
