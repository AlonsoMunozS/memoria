import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { StageByTenderFinder } from "../../../context/tenders/stages/stage/application/findStagesByTender/StageByTenderFinder";
import { findStageByTenderRequest } from "../../../context/tenders/stages/stage/application/findStagesByTender/findStagesByTenderRequest";
import { findFilesNameByStageRequest } from "../../../context/tenders/stages/stages-files/application/findFilesNameByStage/findFilesNameByStageRequest";
import { FilesNameByStageFinder } from "../../../context/tenders/stages/stages-files/application/findFilesNameByStage/filesNameByStageFinder";


export class FindFileNameByStageController {
    constructor(
        private readonly fileNameByStageFinder: FilesNameByStageFinder,
    ) { }

    async findFileNameByStage(req: Request, res: Response) {
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
        const stageName = parseInt(req.params.stageName)

        if (!tenderId && !stageName) {
            res.status(400).send();
            return;
        }

        const request: findFilesNameByStageRequest = {
            tenderId,
            stageName,
        }
        try {
            const stageFileNames = await this.fileNameByStageFinder.findStageFilesName(request)
            res.json(stageFileNames);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'FilesNotFound')
                    res.status(404).send();
            }
            res.status(500).send();
        }

    }

}