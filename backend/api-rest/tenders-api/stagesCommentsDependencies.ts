import { StageCommentCreator } from "../../context/tenders/stages/stages-comments/application/create/stageCommentCreator";
import { CommentsByStageFinder } from "../../context/tenders/stages/stages-comments/application/findByStage/commentsByStageFinder";
import { MongoStageCommentsRepository } from "../../context/tenders/stages/stages-comments/infrastructure/mongo-stage-comments-repository";
import { CreateStageCommentController } from "./Stages-comments/createStageCommentController";
import { FindStageCommentsController } from "./Stages-comments/findStageCommentsController";
import { FindStagesByTenderController } from "./Stages/findStagesByTenderController";

const stageCommentsRepository = new MongoStageCommentsRepository();

const stageCommentCreator = new StageCommentCreator(stageCommentsRepository)
const stageCommentsFinder = new CommentsByStageFinder(stageCommentsRepository)

export const createStageCommentController = new CreateStageCommentController(stageCommentCreator);
export const findCommentByStageController = new FindStageCommentsController(stageCommentsFinder);