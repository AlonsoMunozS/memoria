import express from "express";
import { findByUserNotificationController } from "./notificationsDependencies";


const notificationRouter = express.Router();

notificationRouter.get(
  "/findByUser",
  findByUserNotificationController.findByUserNotification.bind(findByUserNotificationController)
);

export { notificationRouter };
