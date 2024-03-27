import { Request, Response } from "express";
import { PasswordUpdater } from "../../context/users/user/application/updatePassword/passwordUpdater";
import { PasswordUpdateRequest } from "../../context/users/user/application/updatePassword/passwordUpdateRequest";

type updatePasswordBodyRequest = {
    email: string,
    password: string,
    newPassword: string
}

export class UpdatePasswordController {
    constructor(
        private readonly passwordUpdater: PasswordUpdater,
    ) { }

    async updatePassword(req: Request, res: Response) {

        const body = req.body as updatePasswordBodyRequest
        const { email, password, newPassword } = body;

        const request: PasswordUpdateRequest = {
            email,
            password,
            newPassword
        }

        try {
            await this.passwordUpdater.updatePassword(request)
            res.status(200).send();
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
