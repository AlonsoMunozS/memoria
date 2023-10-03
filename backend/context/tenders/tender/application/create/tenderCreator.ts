import { AddNotification } from "../../../../notifications/domain/notification";
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
    await this.tenderRepository.create(tender);

    const notification = new AddNotification({ tenderId: request.id, userId: request.createdBy, createAt: request.createdAt })
    await this.notificationRepository.create(notification)

  }
}
