import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { StageByTenderFinder } from "../../../context/tenders/stages/stage/application/findStagesByTender/StageByTenderFinder";
import { findStageByTenderRequest } from "../../../context/tenders/stages/stage/application/findStagesByTender/findStagesByTenderRequest";


export class FindStagesByTenderController {
    constructor(
        private readonly stageByTenderFinder: StageByTenderFinder,
    ) { }

    async findStagesByTender(req: Request, res: Response) {
        const { authorization } = req.headers
        if (!authorization) {
            res.status(401).send();
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
            res.status(400).send();
            return;
        }

        const request: findStageByTenderRequest = {
            tenderId,
        }
        try {
            const tenderStages = await this.stageByTenderFinder.findStageByTender(request)
            res.json(tenderStages);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'TenderStagesNotFound')
                    res.status(404).send();
            }
            res.status(500).send();
        }

    }

}