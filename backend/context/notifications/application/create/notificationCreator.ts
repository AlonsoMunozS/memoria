import { Notification } from "../../domain/notification";
import { NotificationRepository } from "../../domain/notificationRepository";
import { CreateNotificationRequest } from "./createNotificationRequest";

export class NotificationCreator {
    constructor(
        private readonly notificationRepository: NotificationRepository,
    ) { }

    async createNotification(request: CreateNotificationRequest): Promise<void> {
        // const notification = new Notification(request)
        // await this.notificationRepository.create(notification);
    }
}
