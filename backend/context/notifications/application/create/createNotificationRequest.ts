
export type CreateNotificationRequest = {
    id: number
    userId: string,
    message: string,
    createAt: number,
    read: boolean,
}