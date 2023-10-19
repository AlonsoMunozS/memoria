import { Request, Response } from "express";
import { TenderRemover } from "../../../context/tenders/tender/application/remove/tenderRemover";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { RemoveTenderRequest } from "../../../context/tenders/tender/application/remove/removeTenderRequest";


export class RemoveTenderController {
  constructor(
    private readonly tenderRemover: TenderRemover,
  ) { }

  async removeTender(req: Request, res: Response) {
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

    const request: RemoveTenderRequest = {
      id: tenderId
    }
    try {
      await this.tenderRemover.removeTender(request)
      res.status(201).send();
      return;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'TenderNotFound')
          res.status(404).send();
      }
      res.status(500).send();
    }

  }

}