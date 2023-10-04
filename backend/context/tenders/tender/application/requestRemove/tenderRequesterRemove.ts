import { RequestRemoveNotification } from "../../../../notifications/domain/notification";
import { NotificationRepository } from "../../../../notifications/domain/notificationRepository";
import { UserRepository } from "../../../../users/user/domain/UserRepository";
import { TenderRepository } from "../../domain/tenderRepository";
import { requestRemoveTenderRequest } from "./requestRemoveTenderRequest";

export class TenderRequesterRemove {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository
  ) { }

  async requestRemoveTender(request: requestRemoveTenderRequest): Promise<void> {
    const tender = await this.tenderRepository.findById(request.tenderId)
    if (!tender) {
      throw new Error("TenderNotFound");
    }
    const admin = await this.userRepository.findByRole("admin")
    const today = new Date();
    const createdAt = today.getTime();
    const notifications = admin.map(admin => {
      return new RequestRemoveNotification({ tenderId: tender.id, userId: admin.id, requester: request.userId, createdAt: createdAt })
    })
    await this.notificationRepository.create(notifications)

  }
}
