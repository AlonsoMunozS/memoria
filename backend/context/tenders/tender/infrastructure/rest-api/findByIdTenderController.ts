import { Request, Response } from "express";
import { TenderByIdFinder } from "../../application/findById/tenderByIdFinder";
import { findByIdTenderRequest } from "../../application/findById/findByIdTenderRequest";


export class FindByIdTenderController {
  constructor(
    private readonly tenderByIdFinder: TenderByIdFinder,
    ) {}

  async findByIdTender(req: Request, res: Response) {

    const tenderId  = parseInt(req.params.tenderId)

    if (!tenderId) {
        res.status(404).send();
        return;
    }
    console.log(tenderId,"asdasdsa")
    
    const request: findByIdTenderRequest = {
        id : tenderId
      }
    try {
      const tender = await this.tenderByIdFinder.findByIdTender(request)
      res.json(tender);
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