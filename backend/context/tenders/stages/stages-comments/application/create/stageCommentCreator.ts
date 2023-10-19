import { Comment } from "../../domain/Comment";
import { StageCommentsRepository } from "../../domain/StageCommentsRepository";
import { CreateStageCommentRequest } from "./createStageCommentRequest";


export class StageCommentCreator {
  constructor(
    private readonly stageCommentsRepository: StageCommentsRepository,
    //private readonly notificationSender: NotificationSender,
  ) { }

  async createStageComment(request: CreateStageCommentRequest): Promise<void> {
    const comment = new Comment(request)
    await this.stageCommentsRepository.create(comment);
    // await this.notificationSender.sendNotification({
    //   id: tender.id,
    //   role: "admin",
    //   type: "createTender"
    // })

  }
}
