import { Comment } from "../../stages-comments/domain/Comment"
import { File } from "../../../../shared/domain/File"

export class TenderStage {
        readonly id: number
        readonly tenderId: number
        readonly name: number
        readonly toDate: number
        readonly lastModifiedBy?: string
        readonly lastModifiedAt?: number
        readonly createdAt: number
        readonly createdBy: string
        constructor({
                id,
                tenderId,
                name,
                toDate,
                lastModifiedBy,
                lastModifiedAt,
                createdBy,
                createdAt
        }: {
                id: number
                tenderId: number
                name: number
                toDate: number
                lastModifiedBy?: string
                lastModifiedAt?: number
                createdAt: number
                createdBy: string
        }) {
                this.id = id
                this.tenderId = tenderId
                this.name = name
                this.toDate = toDate
                this.lastModifiedBy = lastModifiedBy
                this.lastModifiedAt = lastModifiedAt
                this.createdBy = createdBy
                this.createdAt = createdAt
        }

}