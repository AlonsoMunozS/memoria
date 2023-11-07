import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";



export class UsersFinder {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async findUsers(): Promise<Array<User>> {
    const users = await this.userRepository.find();
    return users
  }
}
