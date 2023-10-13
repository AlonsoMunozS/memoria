import { Comment } from "./Comment"
import { File } from "./File"

export class TenderStage {
        readonly id: number
        readonly tenderId: number
        readonly name: string
        readonly toDate: number
        readonly files?: Array<File>
        readonly lastModifiedBy?: string
        readonly lastModifiedAt?: number
        readonly createdAt: number
        readonly createdBy: string
        readonly comments?: Array<Comment>

        constructor({
                id,
                tenderId,
                name,
                toDate,
                files,
                lastModifiedBy,
                lastModifiedAt,
                createdBy,
                createdAt,
                comments
        }: {
                id: number
                tenderId: number
                name: string
                toDate: number
                files?: Array<File>
                lastModifiedBy?: string
                lastModifiedAt?: number
                createdAt: number
                createdBy: string
                comments?: Array<Comment>
        }) {
                this.id = id
                this.tenderId = tenderId
                this.name = name
                this.toDate = toDate
                this.files = files
                this.lastModifiedBy = lastModifiedBy
                this.lastModifiedAt = lastModifiedAt
                this.createdBy = createdBy
                this.createdAt = createdAt
                this.comments = comments
        }

}