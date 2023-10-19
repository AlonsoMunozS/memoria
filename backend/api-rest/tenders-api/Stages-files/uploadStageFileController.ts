import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { StageFileUploader } from "../../../context/tenders/stages/stages-files/application/upload/stageFileUploader";
import { StageFileUploadRequest } from "../../../context/tenders/stages/stages-files/application/upload/stageFilesUploadRequest";

export class UploadStageFileController {
    constructor(
        private readonly stageFileUploader: StageFileUploader,
    ) { }

    async uploadStageFile(req: Request, res: Response) {

        const { authorization } = req.headers
        if (!authorization) {
            res.status(401).send();
            return;
        }

        const token = authorization.split(" ")[1]

        // const createdBy = await VerifyToken(token)
        // if (!createdBy) {
        //     res.status(401).send();
        //     return;
        // }

        const tenderId = parseInt(req.params.tenderId)
        const stageName = parseInt(req.params.stageName)


        const file = req.file?.buffer;
        const fileName = req.file?.originalname;


        if (!tenderId || !file || !fileName || stageName == undefined) {
            res.status(400).send();
            return;
        }
        const request: StageFileUploadRequest = {
            tenderId,
            stageName,
            fileName,
            file
        }

        try {
            await this.stageFileUploader.uploadStageFile(request)
            res.status(201).send();
            return;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'TenderNotFound')
                    res.status(404).send();
                else if (error.name === 'InvalidArgumentError')
                    res.status(400).send();
            }
            res.status(500).send();
        }

    }

}
