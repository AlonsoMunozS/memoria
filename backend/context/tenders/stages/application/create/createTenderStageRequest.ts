import { Comment } from "../../domain/Comment"
import { File } from "../../domain/File"

export type CreateTenderStageRequest = {
	id: number
	tenderId: number,
	name: string
	toDate: number
	files?: Array<File>
	lastModifiedBy?: string
	lastModifiedAt?: number
	createdBy: string
	createdAt: number
	comments?: Array<Comment>
}