import { UserRepository } from "../../domain/UserRepository";
import { User } from "../../domain/user";
import { UpdatePermitsRequest } from "./updatePermitsRequest";

export class PermitsUpdater {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async updatePermits(request: UpdatePermitsRequest): Promise<void> {
        const oldUser = await this.userRepository.findById(request.id)
        if (!oldUser) {
            throw new Error("TenderNotFound");
        }
        const updatedUser = new User({
            ...oldUser,
            id: request.id,
            userPermits: request.userPermits ? request.userPermits : oldUser.userPermits,

        })
        await this.userRepository.updatePermits(updatedUser);
    }
}
