import { Request, Response } from "express";
import { RemoveTenderRequest } from "../../application/remove/removeTenderRequest";
import { TenderUpdater } from "../../application/update/tenderUpdater";
import { UpdateTenderRequest } from "../../application/update/updateTenderRequest";


export class UpdateTenderController {
    constructor(
        private readonly tenderUpdater: TenderUpdater,
    ) { }

    async updateTender(req: Request, res: Response) {

        const tenderId = parseInt(req.params.tenderId)

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
            console.log(error)
            res.status(500).send();
        }

    }

}