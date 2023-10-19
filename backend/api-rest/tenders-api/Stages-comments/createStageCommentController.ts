import { Request, Response } from "express";
import VerifyToken from "../../../context/shared/infrastructure/firebase-verify-token";
import { CreateTenderRequest } from "../../../context/tenders/tender/application/create/createTenderRequest";
import { StageCommentCreator } from "../../../context/tenders/stages/stages-comments/application/create/stageCommentCreator";
import { CreateStageCommentRequest } from "../../../context/tenders/stages/stages-comments/application/create/createStageCommentRequest";

type CreateStageCommentBodyRequest = {
  stageId: number
  post: string
}

export class CreateStageCommentController {
  constructor(
    private readonly stageCommentCretor: StageCommentCreator,
  ) { }

  async createStageComment(req: Request, res: Response) {

    const { authorization } = req.headers
    if (!authorization) {
      res.status(401).send();
      return;
    }

    const token = authorization.split(" ")[1]

    const createdBy = await VerifyToken(token)
    if (!createdBy) {
      res.status(401).send();
      return;
    }

    const { stageId, post } = req.body as CreateStageCommentBodyRequest;

    const today = new Date();
    const createdAt = today.getTime();

    if (!post) {
      res.status(400).send();
      return;
    }
    const request: CreateStageCommentRequest = {
      stageId,
      post,
      createdBy,
      createdAt
    }

    try {
      await this.stageCommentCretor.createStageComment(request)
      res.status(201).send();
      return;
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
