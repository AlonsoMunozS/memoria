import { Comment } from "./Comment";

export interface StageCommentsRepository {
    create(comment: Comment): Promise<void>;
    findByStage(stageId: number): Promise<Array<Comment>>;
}

