import { Request, Response } from "express";

import { TenderCreator } from "../../application/create/tenderCreator";
import { CreateTenderRequest } from "../../application/create/createTenderRequest";
import { TenderLocation } from "../../domain/tenderLocation";

type CreateTenderBodyRequest = {
	name: string,
	safi: string,
	province: string,
	commune: string,
  address:string,
	location?: TenderLocation,
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

    const {authorization} = req.headers
    if (!authorization){    
      res.status(400).send();
      return;
    }

    const token = authorization.split(" ")[1]
    console.log("token:", token)
  
    const tokenSections = (token || '').split('.')
    if (tokenSections.length < 2){    
        res.status(400).send();
        return;
      }
  
    const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
    const payload = JSON.parse(payloadJSON)
    console.log("payload:", payload)

    const body = req.body as CreateTenderBodyRequest
    // console.log('body:', body)
    const { name, safi, province, commune, address, location, createdBy, mercadoPublicoId, category} = body;

    const today = new Date();
    const timestamp = today.getTime();

    if (!name || !safi || !province || !commune || !address || !createdBy || !mercadoPublicoId ){
      res.status(400).send();
      return;
    }
    if (location && (!location?.latitude && !location?.longitude)){
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
      location: location?.latitude && location?.longitude ? {latitude:location.latitude, longitude:location.longitude} : undefined,
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
