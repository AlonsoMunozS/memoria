
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
    constructor({ id, userId, createdAt }: { id: number, userId: string, createdAt: number }) {
        super({ id: id, userId, message: "Licitacion Eliminada", createdAt, read: false });
    }
}
export class RequestRemoveNotification extends Notification {
    readonly requester?: string
    constructor({ id, userId, requester, createdAt }: { id: number, userId: string, requester?: string, createdAt: number }) {
        super({ id: id, userId, message: "Solicitud de eliminacion de licitacion", createdAt, read: false });
        this.requester = requester
    }
}

export class AddNotification extends Notification {
    constructor({ id, userId, createdAt }: { id: number, userId: string, createdAt: number }) {
        super({ id: id, userId, message: "Licitacion Agregada", createdAt, read: false });
    }

}
export class UpdateNotification extends Notification {
    constructor({ id, userId, createdAt }: { id: number, userId: string, createdAt: number }) {
        super({ id: id, userId, message: "Licitacion modificada", createdAt, read: false });
    }

}