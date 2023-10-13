import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { StageByTenderFinder } from "../../../context/tenders/stages/stage/application/findByTender/StageByTenderFinder";
import { findStageByTenderRequest } from "../../../context/tenders/stages/stage/application/findByTender/findStageByTenderRequest";


export class FindStageByTenderController {
    constructor(
        private readonly stageByTenderFinder: StageByTenderFinder,
    ) { }

    async findStageByTender(req: Request, res: Response) {
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

        const stageName = req.params.stageName
        if (!stageName) {
            res.status(400).send();
            return;
        }

        const request: findStageByTenderRequest = {
            tenderId,
            stageName
        }
        try {
            const tenderStage = await this.stageByTenderFinder.findStageByTender(request)
            res.json(tenderStage);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'TenderStageNotFound')
                    res.status(404).send();
            }
            res.status(500).send();
        }

    }

}