import { Request, Response } from "express";
import { UserCreator } from "../../application/create/userCreator";
import { CreateUserRequest } from "../../application/create/createUserRequest"
import { UserAttributes } from "../../domain/UserAttributes";

type CreateUserBodyRequest = {
  userAttributes: UserAttributes,
  password: string
}

export class CreateUserController {
  constructor(
    private readonly userCretor: UserCreator,
  ) { }

  async createUser(req: Request, res: Response) {

    const body = req.body as CreateUserBodyRequest
    const { userAttributes, password } = body;

    const request: CreateUserRequest = {
      userAttributes,
      password
    }

    try {
      await this.userCretor.createUser(request)
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
