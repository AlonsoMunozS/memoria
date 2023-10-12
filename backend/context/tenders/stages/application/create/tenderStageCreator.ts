import { TenderStage } from "../../domain/TenderStage";
import { TenderStageRepository } from "../../domain/tenderStageRepository";
import { CreateTenderStageRequest } from "./createTenderStageRequest";


export class TenderStageCreator {
  constructor(
    private readonly tenderStageRepository: TenderStageRepository,
  ) { }

  async createTenderStage(request: CreateTenderStageRequest): Promise<void> {
    const tenderStage = new TenderStage(request)
    await this.tenderStageRepository.create(tenderStage);
    // await this.notificationSender.sendNotification({
    //   id: tender.id,
    //   role: "admin",
    //   type: "createTender"
    // })

  }
}
