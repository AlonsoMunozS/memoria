import { Request, Response } from "express";
import { UserLoginer } from "../../application/signIn/userLoginer";
import { LoginUserRequest } from "../../application/signIn/loginUserRequest";

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
        console.log(body)
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
                if (error.message === 'auth/wrong-password')
                    res.status(401).send();
                else if (error.message === 'auth/user-not-found')
                    res.status(404).send();
                else if (error.message === 'auth/invalid-email')
                    res.status(400).send();
            }
            res.status(500).send();
        }
    }

}
