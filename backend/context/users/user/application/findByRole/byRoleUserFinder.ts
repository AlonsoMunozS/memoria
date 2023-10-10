import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";
import { FindByRoleRequest } from "./findByRoleRequest";


export class ByRoleUserFinder {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async findByRoleUser(request: FindByRoleRequest): Promise<Array<User>> {
    const role = request.role
    const users = await this.userRepository.findByRole(role);
    return users
  }
}
