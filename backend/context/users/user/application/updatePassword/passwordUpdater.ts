import { UserAuth } from "../../domain/userAuth";
import { PasswordUpdateRequest } from "./passwordUpdateRequest";


export class PasswordUpdater {
    constructor(
        private readonly userAuth: UserAuth,
    ) { }

    async updatePassword(request: PasswordUpdateRequest): Promise<void> {
        await this.userAuth.updatePassword(request.email, request.password, request.newPassword);
    }
}
