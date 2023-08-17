import { Request, Response } from "express";

import { TenderCreator } from "../../application/create/tenderCreator";
import { CreateTenderRequest } from "../../application/create/createTenderRequest";

type CreateTenderBodyRequest = {
	name: String,
	safi: String,
	province: string,
	commune: string,
	location?: Array<number>,
	createdBy: number,
	mercadoPublicoId: string,
	category?: string,
}

const getRandomNumber = (min: number, max: number): number => {
  const randomDecimal = Math.random();
  const randomNumber = min + randomDecimal * (max - min);
  return randomNumber;
};

export class TenderController {
  constructor(
    private readonly tenderCretor: TenderCreator,
    ) {}

  async createTender(req: Request, res: Response) {
    const { name, safi, province, commune, location, createdBy, mercadoPublicoId, category} = req.body;
    const today = new Date();
    const timestamp = today.getTime();
    const request: CreateTenderRequest = {
      id : getRandomNumber(1000,999999),
      name,
      safi,
      province,
      commune,
      location,
      createdAt: timestamp,
      createdBy,
      currentStage: "FirstStage",
      mercadoPublicoId,
      category
    }

    await this.tenderCretor.createTender(request)
    res.status(200).send();
  }

}
