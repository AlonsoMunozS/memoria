import { TenderStage } from "../../domain/TenderStage";
import { TenderStageRepository } from "../../domain/tenderStageRepository";
import { findStageByTenderRequest } from "./findStagesByTenderRequest";


export class StageByTenderFinder {
  constructor(
    private readonly tenderStageRepository: TenderStageRepository,
  ) { }

  async findStageByTender(request: findStageByTenderRequest): Promise<Array<TenderStage>> {
    const tenderStages = await this.tenderStageRepository.findStageByTender(request.tenderId);
    if (!tenderStages) {
      throw new Error("TenderStagesNotFound");
    }
    return tenderStages
  }
}
