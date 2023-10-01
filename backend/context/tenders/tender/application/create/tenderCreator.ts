import { Notification } from "../../../../notifications/domain/notification";
import { NotificationRepository } from "../../../../notifications/domain/notificationRepository";
import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { CreateTenderRequest } from "./createTenderRequest";


export class TenderCreator {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationRepository: NotificationRepository
  ) { }

  async createTender(request: CreateTenderRequest): Promise<void> {
    const tender = new Tender(request)
    const notification = new Notification({ id: 123, message: "Hola", createAt: 123, userId: "123", read: false })
    await this.tenderRepository.create(tender);
    await this.notificationRepository.create(notification)

  }
}
