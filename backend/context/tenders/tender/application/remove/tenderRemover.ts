import { TenderRepository } from "../../domain/tenderRepository";
import { RemoveTenderRequest } from "./removeTenderRequest";

export class TenderRemover {
  constructor(
    private readonly tenderRepository: TenderRepository,
  ) {}

  async removeTender(request: RemoveTenderRequest ): Promise<void> {
    const tender = await this.tenderRepository.findById(request.id)
    if (!tender) 
        throw new Error();

    await this.tenderRepository.remove(request.id);
  }
}
