import { UserAttributes } from './UserAttributes';
import { UserToken } from './UserToken';
import { User } from './user';

export interface UserAuth {
	create(userAttributes: UserAttributes, password: string): Promise<void>;
	login(email: string, password: string): Promise<UserToken>;

}

