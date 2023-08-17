import { Tender } from "../../domain/tender";
import { TenderRepository } from "../../domain/tenderRepository";
import { CreateTenderRequest } from "./createTenderRequest";


export class UserCreator {
  constructor(
    private readonly tenderRepository: TenderRepository,
  ) {}

  async createUser(request: CreateTenderRequest ): Promise<void> {
    const tender = new Tender(request)
    await this.tenderRepository.create(tender);
  }
}
