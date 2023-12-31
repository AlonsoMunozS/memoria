import { Notification } from "./notification";

export interface NotificationRepository {
    create(notifications: Array<Notification>): Promise<void>;
    findByUser(userId: string): Promise<Array<Notification> | null>
}

