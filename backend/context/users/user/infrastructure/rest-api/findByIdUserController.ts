import { Request, Response } from "express";
import { UserFinder } from "../../application/findById/userFinder";
import { FindByIdUserRequest } from "../../application/findById/findByIdRequest";


export class FindByIdUserController {
    constructor(
        private readonly userFinder: UserFinder,
    ) { }

    async findByIdUser(req: Request, res: Response) {

        const userId = req.params.userId

        if (!userId) {
            res.status(404).send();
            return;
        }

        const request: FindByIdUserRequest = {
            id: userId
        }

        try {
            const user = await this.userFinder.findByIdUser(request)
            res.json(user);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'UserNotFound')
                    res.status(404).send();
                else if (error.name === 'InvalidArgumentError')
                    res.status(400).send();
            }
            res.status(500).send();
        }

    }

}