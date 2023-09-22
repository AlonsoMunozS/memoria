import { User } from './user';

export interface UserRepository {
    // create(userAttributes: UserAttributes, password: string): Promise<void>;
    findById(id: string): Promise<User>;
}

