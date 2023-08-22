
import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";


export class TendersFinder {
  constructor(
    private readonly tenderRepository: TenderRepository,
  ) {}

  async findTenders(): Promise<Array<Tender>> {
    const tenders = await this.tenderRepository.find();
    return tenders
  }
}
