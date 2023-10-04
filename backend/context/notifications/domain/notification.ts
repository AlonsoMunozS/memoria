
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
export class RequestRemoveNotification extends Notification {
    readonly requester: string
    constructor({ tenderId, userId, requester, createdAt }: { tenderId: number, userId: string, requester: string, createdAt: number }) {
        super({ id: tenderId, userId, message: "Solicitud de eliminacion de licitacion", createdAt, read: false });
        this.requester = requester
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