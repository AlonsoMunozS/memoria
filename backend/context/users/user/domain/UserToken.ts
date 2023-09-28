
export class UserToken {
    readonly refreshToken: string
    readonly accessToken: string
    readonly expirationTime: number

    constructor({
        refreshToken,
        accessToken,
        expirationTime

    }: {
        refreshToken: string
        accessToken: string
        expirationTime: number
    }) {
        this.refreshToken = refreshToken
        this.accessToken = accessToken
        this.expirationTime = expirationTime
    }
}
