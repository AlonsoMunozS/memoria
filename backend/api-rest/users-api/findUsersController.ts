import { Request, Response } from "express";
import VerifyToken from "../../context/shared/infrastructure/firebase-verify-token";
import { UsersFinder } from "../../context/users/user/application/find/usersFinder";

export class FindUsersController {
  constructor(
    private readonly usersFinder: UsersFinder,
  ) { }

  async findUsers(req: Request, res: Response) {
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

    try {
      const users = await this.usersFinder.findUsers()
      res.json(users);
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