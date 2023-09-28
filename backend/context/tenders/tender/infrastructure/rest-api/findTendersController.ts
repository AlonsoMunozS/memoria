import { Request, Response } from "express";
import VerifyToken from "../../../../shared/infrastructure/firebase-verify-token";
import { TendersFinder } from "../../application/find/tendersFinder";

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
    console.log("token:", token)
    const userId = await VerifyToken(token)
    console.log(userId)
    // const tokenSections = (token || '').split('.')
    // if (tokenSections.length < 2) {
    //   res.status(400).send();
    //   return;
    // }

    // const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
    // const payload = JSON.parse(payloadJSON)
    // console.log("payload:", payload)

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