import { NotificationByUserIdFinder } from "../../context/notifications/application/findByUser/notificationByUserFinder";
import { NotificationSender } from "../../context/notifications/application/send/notificationSenser";
import { MongoNotificationRepository } from "../../context/notifications/infrastructure/mongo-notification-repository";
import { ByRoleUserFinder } from "../../context/users/user/application/findByRole/byRoleUserFinder";
import { MongoUserRepository } from "../../context/users/user/infrastructure/mongo-user-repository";
import { FindByUserNotificationController } from "./findByUserNotificationController";

const notificationRepository = new MongoNotificationRepository();
const userRepository = new MongoUserRepository();

const byRoleUserFinder = new ByRoleUserFinder(userRepository)

const notificationByUserFinder = new NotificationByUserIdFinder(notificationRepository)

export const notificationSender = new NotificationSender(notificationRepository, byRoleUserFinder)
export const findByUserNotificationController = new FindByUserNotificationController(notificationByUserFinder);



