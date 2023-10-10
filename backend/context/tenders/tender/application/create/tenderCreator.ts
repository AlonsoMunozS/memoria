import { NotificationSender } from "../../../../notifications/application/send/notificationSenser";
import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { CreateTenderRequest } from "./createTenderRequest";


export class TenderCreator {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationSender: NotificationSender,
  ) { }

  async createTender(request: CreateTenderRequest): Promise<void> {
    const tender = new Tender(request)
    await this.tenderRepository.create(tender);
    // await this.notificationSender.sendNotification({
    //   id: tender.id,
    //   role: "admin",
    //   type: "createTender"
    // })

  }
}
