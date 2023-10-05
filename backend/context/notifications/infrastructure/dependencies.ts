import { NotificationByUserIdFinder } from "../application/findByUser/notificationByUserFinder";
import { FindByUserNotificationController } from "./rest-api/findByUserNotificationController";
import { MongoNotificationRepository } from "./tender-repository/mongo-notification-repository";

const notificationRepository = new MongoNotificationRepository();

const notificationByUserFinder = new NotificationByUserIdFinder(notificationRepository)

export const findByUserNotificationController = new FindByUserNotificationController(notificationByUserFinder);



