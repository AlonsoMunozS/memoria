import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { TenderFilesUploader } from "../../../context/tenders/stages/stages-files/application/upload/tenderFilesUploader";
import { TenderFilesUploadRequest } from "../../../context/tenders/stages/stages-files/application/upload/tenderFilesUploadRequest";

export class UploadTenderFileController {
    constructor(
        private readonly tenderFileUploader: TenderFilesUploader,
    ) { }

    async uploadTenderFile(req: Request, res: Response) {

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

        const file = req.file?.buffer;
        const fileName = req.file?.originalname;


        if (!tenderId || !file || !fileName) {
            res.status(400).send();
            return;
        }
        const request: TenderFilesUploadRequest = {
            tenderId,
            fileName,
            file
        }

        try {
            await this.tenderFileUploader.uploadTenderFile(request)
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
