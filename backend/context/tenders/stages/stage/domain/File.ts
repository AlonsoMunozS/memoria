export class File {
    readonly name: string
    readonly uploadBy: string
    readonly uploadAt: number

    constructor({
        name,
        uploadBy,
        uploadAt,
    }: {
        name: string
        uploadBy: string
        uploadAt: number
    }) {
        this.name = name
        this.uploadBy = uploadBy
        this.uploadAt = uploadAt
    }

}