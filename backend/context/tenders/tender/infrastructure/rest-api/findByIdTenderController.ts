import { Request, Response } from "express";
import { TenderByIdFinder } from "../../application/findById/tenderByIdFinder";
import { findByIdTenderRequest } from "../../application/findById/findByIdTenderRequest";
import VerifyToken from "../../../../shared/infrastructure/firebase-verify-token";


export class FindByIdTenderController {
  constructor(
    private readonly tenderByIdFinder: TenderByIdFinder,
  ) { }

  async findByIdTender(req: Request, res: Response) {
    const { authorization } = req.headers
    if (!authorization) {
      res.status(400).send();
      return;
    }

    const token = authorization.split(" ")[1]

    const userId = await VerifyToken(token)
    if (!userId) {
      res.status(401).send();
      return;
    }
    const tenderId = parseInt(req.params.tenderId)

    if (!tenderId) {
      res.status(404).send();
      return;
    }

    const request: findByIdTenderRequest = {
      id: tenderId
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