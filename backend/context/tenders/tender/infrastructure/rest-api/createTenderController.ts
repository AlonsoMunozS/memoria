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

export class CreateTenderController {
  constructor(
    private readonly tenderCretor: TenderCreator,
    ) {}

  async createTender(req: Request, res: Response) {
    const { name, safi, province, commune, address, location, createdBy, mercadoPublicoId, category} = req.body;

    const today = new Date();
    const timestamp = today.getTime();

    if (!name || !safi || !province || !commune || !address || !location || !createdBy || !mercadoPublicoId || !category){
      res.status(400).send();
      return;

    }
    const request: CreateTenderRequest = {
      id : Math.floor(getRandomNumber(1000,999999)),
      name,
      safi,
      province,
      commune,
      address,
      location,
      createdAt: timestamp,
      createdBy,
      currentStage: "FirstStage",
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
