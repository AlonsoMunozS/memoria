import express from "express";

import { createUserController, findByIdUserController, loginUserController, updatePasswordController, refreshTokenController } from "../dependencies";


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

userRouter.put(
  "/updatePassword",
  updatePasswordController.updatePassword.bind(updatePasswordController)
);

userRouter.put(
  "/refreshToken",
  refreshTokenController.refreshToken.bind(refreshTokenController)
);

export { userRouter };
