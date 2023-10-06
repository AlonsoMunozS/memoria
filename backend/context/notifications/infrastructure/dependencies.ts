import { ByRoleUserFinder } from "../../users/user/application/findByRole/byRoleUserFinder";
import { NotificationByUserIdFinder } from "../application/findByUser/notificationByUserFinder";
import { FindByUserNotificationController } from "./rest-api/findByUserNotificationController";
import { MongoNotificationRepository } from "./tender-repository/mongo-notification-repository";
import { MongoUserRepository } from "../../users/user/infrastructure/user-repository/mongo-user-repository";
import { NotificationSender } from "../application/send/notificationSenser";

const notificationRepository = new MongoNotificationRepository();
const userRepository = new MongoUserRepository();

const byRoleUserFinder = new ByRoleUserFinder(userRepository)

const notificationByUserFinder = new NotificationByUserIdFinder(notificationRepository)

export const notificationSender = new NotificationSender(notificationRepository, byRoleUserFinder)
export const findByUserNotificationController = new FindByUserNotificationController(notificationByUserFinder);



