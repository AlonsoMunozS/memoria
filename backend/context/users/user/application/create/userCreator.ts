import { UserAttributes } from "../../domain/UserAttributes";
import { User } from "../../domain/user";
import { UserAuth } from "../../domain/userAuth";
import { CreateUserRequest } from "./createUserRequest";


export class UserCreator {
  constructor(
    private readonly userAuth: UserAuth,
  ) {}

  async createUser(request: CreateUserRequest ): Promise<any> {
    const rut = request.userAttributes.rut
    const email = request.userAttributes.email

    const userAttributes: UserAttributes = {
      email,
      rut
    }
    await this.userAuth.create(userAttributes, request.password);
  }
}
