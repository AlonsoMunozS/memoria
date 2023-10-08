import express from "express";
import { findByUserNotificationController } from "../dependencies";


const notificationRouter = express.Router();

notificationRouter.get(
  "/findByUser",
  findByUserNotificationController.findByUserNotification.bind(findByUserNotificationController)
);

export { notificationRouter };
