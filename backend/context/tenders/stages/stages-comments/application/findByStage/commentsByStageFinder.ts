import { Comment } from "../../domain/Comment";
import { StageCommentsRepository } from "../../domain/StageCommentsRepository";
import { FindByStageCommentRequest } from "./findByStageCommentRequest";



export class CommentsByStageFinder {
  constructor(
    private readonly stageCommentsRepository: StageCommentsRepository,
  ) { }

  async findStageComments(request: FindByStageCommentRequest): Promise<Array<Comment>> {
    const tenders = await this.stageCommentsRepository.findByStage(request.stageId);
    return tenders
  }
}
