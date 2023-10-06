import { Request, Response } from "express";
import { NotificationByUserIdFinder } from "../../application/findByUser/notificationByUserFinder";
import VerifyToken from "../../../shared/infrastructure/firebase-verify-token";
import { FindByUserNotificationRequest } from "../../application/findByUser/findByUserNotificationRequest";

export class FindByUserNotificationController {
  constructor(
    private readonly notificationByUserFinder: NotificationByUserIdFinder,
  ) { }

  async findByUserNotification(req: Request, res: Response) {
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

    const request: FindByUserNotificationRequest = {
      userId
    }
    try {
      const tender = await this.notificationByUserFinder.findByUserIdNotification(request)
      res.json(tender);
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