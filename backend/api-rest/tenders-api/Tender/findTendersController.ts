import { Request, Response } from "express";
import { TendersFinder } from "../../../context/tenders/tender/application/find/tendersFinder";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";

export class FindTendersController {
  constructor(
    private readonly tendersFinder: TendersFinder,
  ) { }

  async findTenders(req: Request, res: Response) {
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