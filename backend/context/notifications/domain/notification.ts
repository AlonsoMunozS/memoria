
export class Notification {
    constructor(
        readonly id: number,
        readonly userId: string,
        readonly message: string,
        readonly createdAt: number,
        readonly read: boolean
    ) { }
}
export class RemoveNotification extends Notification {
    constructor({ tenderId, userId, createAt }: { tenderId: number, userId: string, createAt: number }) {
        super(tenderId, userId, "Licitacion Eliminada", createAt, false);
    }
}

export class AddNotification extends Notification {
    constructor({ tenderId, userId, createAt }: { tenderId: number, userId: string, createAt: number }) {
        super(tenderId, userId, "Licitacion Agregada", createAt, false);
    }
}

export class UpdateNotification extends Notification {
    constructor({ tenderId, userId, createAt }: { tenderId: number, userId: string, createAt: number }) {
        super(tenderId, userId, "Licitacion modificada", createAt, false);
    }
}