import { Notification } from "../../domain/notification";
import { NotificationRepository } from "../../domain/notificationRepository";
import { FindByUserNotificationRequest } from "./findByUserNotificationRequest";


export class NotificationByUserIdFinder {
    constructor(
        private readonly notificationRepository: NotificationRepository,
    ) { }

    async findByUserIdNotification(request: FindByUserNotificationRequest): Promise<Array<Notification> | null> {
        const notifications = await this.notificationRepository.findByUser(request.userId);
        return notifications
    }
}
