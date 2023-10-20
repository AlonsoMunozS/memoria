import { Request, Response } from "express";
import { TenderUpdater } from "../../../context/tenders/tender/application/update/tenderUpdater";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { UpdateTenderRequest } from "../../../context/tenders/tender/application/update/updateTenderRequest";


export class UpdateTenderController {
    constructor(
        private readonly tenderUpdater: TenderUpdater,
    ) { }

    async updateTender(req: Request, res: Response) {
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
        console.log(tenderId)
        if (!tenderId) {
            res.status(404).send();
            return;
        }
        const { name, safi, region, province, commune, address, location, currentStage, mercadoPublicoId, category } = req.body;

        const request: UpdateTenderRequest = {
            id: tenderId,
            name,
            safi,
            region,
            province,
            commune,
            address,
            location,
            currentStage,
            mercadoPublicoId,
            category
        }
        try {
            await this.tenderUpdater.updateTender(request)
            res.status(201).send();
            return;
        } catch (error) {
            res.status(500).send();
        }

    }

}