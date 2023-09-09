
import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { findByIdTenderRequest } from "./findByIdTenderRequest";

export class TenderByIdFinder {
  constructor(
    private readonly tenderRepository: TenderRepository,
  ) {}

  async findByIdTender(request: findByIdTenderRequest): Promise<Tender> {
    const tender = await this.tenderRepository.findById(request.id);
    return tender
  }
}
