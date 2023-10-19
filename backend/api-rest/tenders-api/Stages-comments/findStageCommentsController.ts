import { Request, Response } from "express";
import { TendersFinder } from "../../../context/tenders/tender/application/find/tendersFinder";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { CommentsByStageFinder } from "../../../context/tenders/stages/stages-comments/application/findByStage/commentsByStageFinder";
import { FindByStageCommentRequest } from "../../../context/tenders/stages/stages-comments/application/findByStage/findByStageCommentRequest";

export class FindStageCommentsController {
  constructor(
    private readonly stageCommentsFinder: CommentsByStageFinder,
  ) { }

  async findStageComments(req: Request, res: Response) {
    const { authorization } = req.headers
    if (!authorization) {
      res.status(400).send();
      return;
    }

    const token = authorization.split(" ")[1]
    const userId = await VerifyToken(token)

    if (!userId) {
      res.status(401).send();
      return;
    }
    const stageId = parseInt(req.params.stageId)
    console.log(stageId)
    if (!stageId) {
      res.status(400).send();
      return;
    }
    const request: FindByStageCommentRequest = {
      stageId
    }

    try {
      const comments = await this.stageCommentsFinder.findStageComments(request)
      res.json(comments);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotFoundException')
          res.status(404).send();
        else if (error.name === 'InvalidArgumentError')
          res.status(400).send();
      }
      res.status(500).send();
    }

  }

}