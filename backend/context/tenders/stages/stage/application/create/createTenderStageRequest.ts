import { Comment } from "../../../stages-comments/domain/Comment"
import { File } from "../../../../../shared/domain/File"

export type CreateTenderStageRequest = {
	id: number
	tenderId: number,
	name: number
	toDate: number
	files?: Array<File>
	lastModifiedBy?: string
	lastModifiedAt?: number
	createdBy: string
	createdAt: number
	comments?: Array<Comment>
}