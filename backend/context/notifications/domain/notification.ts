
export class Notification {
    readonly id: number
    readonly userId: string
    readonly message: string
    readonly createdAt: number
    readonly read: boolean
    constructor({
        id,
        userId,
        message,
        createdAt,
        read,
    }: {
        id: number
        userId: string
        message: string
        createdAt: number
        read: boolean
    }
    ) {
        this.id = id
        this.userId = userId
        this.message = message
        this.createdAt = createdAt
        this.read = read
    }
}
export class RemoveNotification extends Notification {
    constructor({ tenderId, userId, createdAt }: { tenderId: number, userId: string, createdAt: number }) {
        super({ id: tenderId, userId, message: "Licitacion Eliminada", createdAt, read: false });
    }
}

export class AddNotification extends Notification {
    constructor({ tenderId, userId, createdAt }: { tenderId: number, userId: string, createdAt: number }) {
        super({ id: tenderId, userId, message: "Licitacion Agregada", createdAt, read: false });
    }

}
export class UpdateNotification extends Notification {
    constructor({ tenderId, userId, createdAt }: { tenderId: number, userId: string, createdAt: number }) {
        super({ id: tenderId, userId, message: "Licitacion modificada", createdAt, read: false });
    }

}