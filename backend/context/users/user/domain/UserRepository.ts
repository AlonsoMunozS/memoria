import { UserAttributes } from './UserAttributes';
import { User } from './user';

export interface UserRepository {
    create(userId: string, userAttributes: UserAttributes): Promise<void>;
    find(): Promise<Array<User>>;
    findById(id: string): Promise<User>;
    findByRole(role: string): Promise<Array<User>>;
    updatePermits(user: User): Promise<void>;
}

