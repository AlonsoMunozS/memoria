import { TenderStage } from "../../domain/TenderStage";
import { TenderStageRepository } from "../../domain/tenderStageRepository";
import { findStageByTenderRequest } from "./findStageByTenderRequest";


export class StageByTenderFinder {
  constructor(
    private readonly tenderStageRepository: TenderStageRepository,
  ) { }

  async findStageByTender(request: findStageByTenderRequest): Promise<TenderStage> {
    const tenderStage = await this.tenderStageRepository.findStageByTender(request.tenderId, request.stageName);
    if (!tenderStage) {
      throw new Error("TenderStageNotFound");
    }
    return tenderStage
  }
}
