import { UserToken } from "../../domain/UserToken";
import { User } from "../../domain/user";
import { UserAuth } from "../../domain/userAuth";
import { LoginUserRequest } from "./loginUserRequest";

export class UserLoginer {
  constructor(
    private readonly userAuth: UserAuth,
  ) { }

  async loginUser(request: LoginUserRequest): Promise<UserToken> {
    const email = request.email
    const password = request.password

    const userToken = await this.userAuth.login(email, password);
    return userToken
  }
}
