import { Notification } from "./notification";

export interface NotificationRepository {
    create(notification: Notification): Promise<void>;
}

