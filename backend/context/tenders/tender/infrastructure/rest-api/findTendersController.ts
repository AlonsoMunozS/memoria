import { Request, Response } from "express";

import { TendersFinder } from "../../application/find/tendersFinder";

export class FindTendersController {
  constructor(
    private readonly tendersFinder: TendersFinder,
    ) {}

  async findTenders(res: Response) {

    try {
      const tenders = await this.tendersFinder.findTenders()
      res.json(tenders);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotFoundException')
        res.status(404).send();
        else if (error.name === 'InvalidArgumentError')
        res.status(400).send();
      }
      res.status(500).send();
    }

  }

}