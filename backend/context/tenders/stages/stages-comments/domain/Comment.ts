
export class Comment {
        readonly stageId: number
        readonly createdBy: string
        readonly createdAt: number
        readonly post: string

        constructor({
                stageId,
                createdBy,
                createdAt,
                post,
        }: {
                stageId: number
                createdBy: string
                createdAt: number
                post: string
        }) {
                this.stageId = stageId
                this.createdBy = createdBy
                this.createdAt = createdAt
                this.post = post
        }

}