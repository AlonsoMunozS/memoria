import { UserAttributes } from './UserAttributes';

export interface UserAuth {
	create(userAttributes: UserAttributes, password: string): Promise<void>;
}

