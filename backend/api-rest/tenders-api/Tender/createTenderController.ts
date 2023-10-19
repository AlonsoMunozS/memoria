import { Request, Response } from "express";
import { TenderCreator } from "../../../context/tenders/tender/application/create/tenderCreator";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { CreateTenderRequest } from "../../../context/tenders/tender/application/create/createTenderRequest";

type CreateTenderBodyRequest = {
  name: string,
  safi: string,
  region: string
  province: string,
  commune: string,
  address: string
  createdBy: number,
  mercadoPublicoId: string,
  category?: string,
}

const getRandomNumber = (min: number, max: number): number => {
  const randomDecimal = Math.random();
  const randomNumber = min + randomDecimal * (max - min);
  return randomNumber;
};

export class CreateTenderController {
  constructor(
    private readonly tenderCretor: TenderCreator,
  ) { }

  async createTender(req: Request, res: Response) {

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

    const { name, safi, region, province, commune, address, mercadoPublicoId, category } = req.body as CreateTenderBodyRequest;

    const today = new Date();
    const createdAt = today.getTime();

    if (!name || !safi || !region || !province || !commune || !address || !mercadoPublicoId) {
      res.status(400).send();
      return;
    }
    const request: CreateTenderRequest = {
      id: Math.floor(getRandomNumber(1000, 999999)),
      name,
      safi,
      region,
      province,
      commune,
      address,
      createdAt,
      createdBy,
      currentStage: 0,
      mercadoPublicoId,
      category
    }

    try {
      await this.tenderCretor.createTender(request)
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
