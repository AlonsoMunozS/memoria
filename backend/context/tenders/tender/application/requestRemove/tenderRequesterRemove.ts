import { NotificationSender } from "../../../../notifications/application/send/notificationSenser";
import { TenderRepository } from "../../domain/tenderRepository";
import { requestRemoveTenderRequest } from "./requestRemoveTenderRequest";

export class TenderRequesterRemove {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationSenser: NotificationSender,
  ) { }

  async requestRemoveTender(request: requestRemoveTenderRequest): Promise<void> {
    const tender = await this.tenderRepository.findById(request.tenderId)
    if (!tender) {
      throw new Error("TenderNotFound");
    }

    await this.notificationSenser.sendNotification({
      id: tender.id,
      role: "admin",
      type: "RequestRemoveNotification",
      requester: request.userId
    })

  }
}
