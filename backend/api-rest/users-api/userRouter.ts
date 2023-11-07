import express from "express";

import { createUserController, findByIdUserController, findUsersController, loginUserController, updatePasswordController } from "./usersDependencies";


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

userRouter.get(
  "/",
  findUsersController.findUsers.bind(findUsersController)
);
userRouter.put(
  "/updatePassword",
  updatePasswordController.updatePassword.bind(updatePasswordController)
);

export { userRouter };
