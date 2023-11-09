import { Request, Response } from "express";
import VerifyToken from "../../context/shared/infrastructure/firebase-verify-token";
import { PermitsUpdater } from "../../context/users/user/application/updatePermits/permitsUpdater";
import { UpdatePermitsRequest } from "../../context/users/user/application/updatePermits/updatePermitsRequest";


export class UpdatePermitsController {
    constructor(
        private readonly permitsUpdater: PermitsUpdater,
    ) { }

    async updatePermits(req: Request, res: Response) {
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
        const userUpdatedId = req.params.userUpdatedId
        if (!userUpdatedId) {
            res.status(404).send();
            return;
        }
        const { userPermits } = req.body;

        const request: UpdatePermitsRequest = {
            id: userUpdatedId,
            userPermits
        }
        try {
            await this.permitsUpdater.updatePermits(request)
            res.status(201).send();
            return;
        } catch (error) {
            res.status(500).send();
        }

    }

}