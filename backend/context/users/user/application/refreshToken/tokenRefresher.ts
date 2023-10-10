import { UserToken } from "../../domain/UserToken";
import { UserAuth } from "../../domain/userAuth";
import { RefreshTokenRequest } from "./RefreshTokenRequest";

export class TokenRefresher {
    constructor(
        private readonly userAuth: UserAuth,
    ) { }

    async refreshToken(request: RefreshTokenRequest): Promise<UserToken> {
        const refreshtoken = request.refreshToken

        const userToken = await this.userAuth.refreshToken(refreshtoken);
        return userToken
    }
}

