import { UserAttributes } from './UserAttributes';
import { User } from './user';

export interface UserRepository {
    create(userId: string, userAttributes: UserAttributes): Promise<void>;
    findById(id: string): Promise<User>;
    findByRole(role: string): Promise<Array<User>>;
}

