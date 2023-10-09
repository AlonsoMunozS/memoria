import { UserToken } from "../../domain/UserToken";
import { UserAuth } from "../../domain/userAuth";
import { RefreshtokenRequest } from "./RefreshTokenRequest";

export class TokenRefresher {
    constructor(
        private readonly userAuth: UserAuth,
    ) { }

    async refreshToken(request: RefreshtokenRequest): Promise<UserToken> {
        const refreshtoken = request.refreshtoken

        const userToken = await this.userAuth.refreshToken(refreshtoken);
        return userToken
    }
}
