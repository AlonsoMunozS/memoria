import { RemoveNotification } from "../../../../notifications/domain/notification";
import { NotificationRepository } from "../../../../notifications/domain/notificationRepository";
import { UserRepository } from "../../../../users/user/domain/UserRepository";
import { TenderRepository } from "../../domain/tenderRepository";
import { RemoveTenderRequest } from "./removeTenderRequest";

export class TenderRemover {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository
  ) { }

  async removeTender(request: RemoveTenderRequest): Promise<void> {
    const tender = await this.tenderRepository.findById(request.id)
    if (!tender) {
      throw new Error("TenderNotFound");
    }
    await this.tenderRepository.remove(tender.id)
    const admin = await this.userRepository.findByRole("admin")
    const today = new Date();
    const createdAt = today.getTime();
    const notifications = admin.map(admin => {
      return new RemoveNotification({ tenderId: tender.id, userId: admin.id, createAt: createdAt })
    })
    await this.notificationRepository.create(notifications)

  }
}
