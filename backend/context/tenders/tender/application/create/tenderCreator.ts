import { AddNotification } from "../../../../notifications/domain/notification";
import { NotificationRepository } from "../../../../notifications/domain/notificationRepository";
import { UserRepository } from "../../../../users/user/domain/UserRepository";
import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { CreateTenderRequest } from "./createTenderRequest";


export class TenderCreator {
  constructor(
    private readonly tenderRepository: TenderRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository
  ) { }

  async createTender(request: CreateTenderRequest): Promise<void> {
    const tender = new Tender(request)
    await this.tenderRepository.create(tender);
    const users = await this.userRepository.findByRole("licitador")
    const notifications = users.map(user => {
      return new AddNotification({ tenderId: request.id, userId: user.id, createAt: request.createdAt })
    })
    await this.notificationRepository.create(notifications)
  }
}
