import { Request, Response } from "express";
import { TenderRemover } from "../../application/remove/tenderRemover";
import { RemoveTenderRequest } from "../../application/remove/removeTenderRequest";


export class RemoveTenderController {
  constructor(
    private readonly tenderRemover: TenderRemover,
    ) {}

  async removeTender(req: Request, res: Response) {

    const tenderId  = parseInt(req.params.tenderId)

    if (!tenderId) {
        res.status(404).send();
        return;
    }

    const request: RemoveTenderRequest = {
        id : tenderId
      }
    try {
      await this.tenderRemover.removeTender(request)
      res.status(201).send();
      return;
    } catch (error) {
      console.log(error)
      res.status(500).send();
    }

  }

}