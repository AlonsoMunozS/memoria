import { Request, Response } from "express";
import { UserLoginer } from "../../application/singin/userLoginer";
import { LoginUserRequest } from "../../application/singin/loginUserRequest";

type LoginUserBodyRequest = {
    email: string
    password: string
}

export class LoginUserController {
    constructor(
        private readonly userLoginer: UserLoginer,
    ) { }

    async loginUser(req: Request, res: Response) {

        const body = req.body as LoginUserBodyRequest
        const { email, password } = body;

        const request: LoginUserRequest = {
            email,
            password
        }

        try {
            const resp = await this.userLoginer.loginUser(request)
            res.json(resp);
            return;
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'NotFoundException')
                    res.status(404).send();
                else if (error.name === 'InvalidArgumentError')
                    res.status(400).send();
            }
            res.status(500).send();
        }
    }

}
