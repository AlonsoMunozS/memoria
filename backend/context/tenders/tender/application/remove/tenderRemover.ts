import { NotificationSender } from "../../../../notifications/application/send/notificationSenser";
import { TenderRepository } from "../../domain/tenderRepository";
import { RemoveTenderRequest } from "./removeTenderRequest";

export class TenderRemover {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationSenser: NotificationSender,
  ) { }

  async removeTender(request: RemoveTenderRequest): Promise<void> {
    const tender = await this.tenderRepository.findById(request.id)
    if (!tender) {
      throw new Error("TenderNotFound");
    }
    await this.tenderRepository.remove(tender.id)

    await this.notificationSenser.sendNotification({
      id: tender.id,
      role: "admin",
      type: "removeTender"
    })
  }
}
