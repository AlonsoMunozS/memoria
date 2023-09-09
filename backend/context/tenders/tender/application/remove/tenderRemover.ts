import { TenderRepository } from "../../domain/tenderRepository";
import { RemoveTenderRequest } from "./removeTenderRequest";

export class TenderCreator {
  constructor(
    private readonly tenderRepository: TenderRepository,
  ) {}

  async createTender(request: RemoveTenderRequest ): Promise<void> {
    

    await this.tenderRepository.create(tender);
  }
}
