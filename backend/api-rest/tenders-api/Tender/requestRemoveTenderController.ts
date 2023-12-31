import { Request, Response } from "express";
import { TenderRequesterRemove } from "../../../context/tenders/tender/application/requestRemove/tenderRequesterRemove";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { requestRemoveTenderRequest } from "../../../context/tenders/tender/application/requestRemove/requestRemoveTenderRequest";


export class RequestRemoveTenderController {
    constructor(
        private readonly tenderRequesterRemove: TenderRequesterRemove,
    ) { }

    async requestRemoveTender(req: Request, res: Response) {
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

        if (!tenderId) {
            res.status(404).send();
            return;
        }

        const request: requestRemoveTenderRequest = {
            tenderId,
            userId
        }
        try {
            await this.tenderRequesterRemove.requestRemoveTender(request)
            res.status(201).send();
            return;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'TenderNotFound')
                    res.status(404).send();
            }
            res.status(500).send();
        }

    }

}