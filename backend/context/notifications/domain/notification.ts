export class Notification {
    readonly id: number
    readonly userId: string
    readonly message: string
    readonly createAt: number
    readonly read: boolean

    constructor({
        id,
        userId,
        message,
        createAt,
        read
    }: {
        id: number,
        userId: string,
        message: string,
        createAt: number,
        read: boolean

    }) {
        this.id = id
        this.userId = userId
        this.message = message
        this.createAt = createAt
        this.read = read
    }

}