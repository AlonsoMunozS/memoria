import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";
import { FindByIdUserRequest } from "./findByIdRequest";


export class UserFinder {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async findByIdUser(request: FindByIdUserRequest): Promise<User> {
    const id = request.id
    const user = await this.userRepository.findById(id);
    return user
  }
}
