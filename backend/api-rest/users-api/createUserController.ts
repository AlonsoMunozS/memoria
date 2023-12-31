import { Request, Response } from "express";
import { UserAttributes } from "../../context/users/user/domain/UserAttributes";
import { UserCreator } from "../../context/users/user/application/create/userCreator";
import { CreateUserRequest } from "../../context/users/user/application/create/createUserRequest";

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
    console.log(request)

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
