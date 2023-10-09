import { Request, Response } from "express";
import { TokenRefresher } from "../../application/refreshToken/tokenRefresher";

type RefreshTokenBodyRequest = {
    refreshtoken: string
}

export class RefreshTokenController {
    constructor(
        private readonly tokenRefresher: TokenRefresher,
    ) { }

    async refreshToken(req: Request, res: Response) {

        const body = req.body as RefreshTokenBodyRequest
        const { refreshtoken } = body;

        const request: RefreshTokenBodyRequest = {
            refreshtoken
        }

        try {
            const resp = await this.tokenRefresher.refreshToken(request)
            res.json(resp);
            return;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
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
