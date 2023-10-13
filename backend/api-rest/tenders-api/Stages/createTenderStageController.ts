import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { TenderStageCreator } from "../../../context/tenders/stages/stage/application/create/tenderStageCreator";
import { CreateTenderStageRequest } from "../../../context/tenders/stages/stage/application/create/createTenderStageRequest";

type CreateTenderStageBodyRequest = {
  name: string
  tenderId: number
  toDate: number
}

const getRandomNumber = (min: number, max: number): number => {
  const randomDecimal = Math.random();
  const randomNumber = min + randomDecimal * (max - min);
  return randomNumber;
};

export class CreateTenderStageController {
  constructor(
    private readonly tenderStageCreator: TenderStageCreator,
  ) { }

  async createTenderStage(req: Request, res: Response) {

    const { authorization } = req.headers
    if (!authorization) {
      res.status(401).send();
      return;
    }

    const token = authorization.split(" ")[1]

    const createdBy = await VerifyToken(token)
    if (!createdBy) {
      res.status(401).send();
      return;
    }

    const { name, tenderId, toDate } = req.body as CreateTenderStageBodyRequest;

    const today = new Date();
    const createdAt = today.getTime();

    if (!name || !tenderId || !toDate) {
      res.status(400).send();
      return;
    }

    const request: CreateTenderStageRequest = {
      id: Math.floor(getRandomNumber(1000, 999999)),
      tenderId,
      name,
      toDate,
      createdAt,
      createdBy
    }

    try {
      await this.tenderStageCreator.createTenderStage(request)
      res.status(201).send();
      return;
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
