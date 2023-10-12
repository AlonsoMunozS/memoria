
export class Comment {
        readonly createBy: string
        readonly cretateAt: number
        readonly post: string

        constructor({
                createBy,
                cretateAt,
                post,
        }: {
                createBy: string
                cretateAt: number
                post: string
        }) {
                this.createBy = createBy
                this.cretateAt = cretateAt
                this.post = post
        }

}