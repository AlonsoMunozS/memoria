import { ByRoleUserFinder } from "../../../users/user/application/findByRole/byRoleUserFinder";
import { AddNotification, RemoveNotification, RequestRemoveNotification, UpdateNotification } from "../../domain/notification";
import { NotificationRepository } from "../../domain/notificationRepository";
import { SendNotificationRequest } from "./sendNotificationRequest";


export class NotificationSender {
    constructor(
        private readonly notificationRepository: NotificationRepository,
        private readonly byRoleUserFinder: ByRoleUserFinder
    ) { }

    async sendNotification(request: SendNotificationRequest): Promise<void> {
        const today = new Date();
        const createdAt = today.getTime();
        const users = await this.byRoleUserFinder.findByRoleUser({ role: request.role })

        if (request.type === "createTender") {
            const notifications = users.map(user => {
                return new AddNotification({ id: request.id, userId: user.id, createdAt: createdAt })
            })
            await this.notificationRepository.create(notifications)
        }
        if (request.type === "removeTender") {
            const notifications = users.map(user => {
                return new RemoveNotification({ id: request.id, userId: user.id, createdAt: createdAt })
            })
            await this.notificationRepository.create(notifications)
        }
        if (request.type === "updateTender") {
            const notifications = users.map(user => {
                return new UpdateNotification({ id: request.id, userId: user.id, createdAt: createdAt })
            })
            await this.notificationRepository.create(notifications)
        }
        if (request.type === "RequestRemoveNotification") {
            const notifications = users.map(user => {
                return new RequestRemoveNotification({ id: request.id, userId: user.id, createdAt: createdAt, requester: request.requester })
            })
            await this.notificationRepository.create(notifications)
        }


    }
}
