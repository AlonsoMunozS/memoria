import { UserRepository } from "../../domain/UserRepository";
import { FindByIdUserRequest } from "./findByIdRequest";


export class UserFinder {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async findByIdUser(request: FindByIdUserRequest): Promise<any> {
    const id = request.id
    const user = await this.userRepository.findById(id);
    return user
  }
}
