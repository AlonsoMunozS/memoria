import { UserAttributes } from "../../domain/UserAttributes";
import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";
import { UserAuth } from "../../domain/userAuth";
import { CreateUserRequest } from "./createUserRequest";


export class UserCreator {
  constructor(
    private readonly userAuth: UserAuth,
    private readonly userRepository: UserRepository
  ) { }

  async createUser(request: CreateUserRequest): Promise<any> {
    const rut = request.userAttributes.rut
    const name = request.userAttributes.name
    const email = request.userAttributes.email
    const userPermits = request.userAttributes?.userPermits
    const role = request.userAttributes.role

    const userAttributes: UserAttributes = {
      email,
      name,
      rut,
      userPermits,
      role
    }
    const userId = await this.userAuth.create(userAttributes.email, request.password);
    await this.userRepository.create(userId, userAttributes);
  }
}
