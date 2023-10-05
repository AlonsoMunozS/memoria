import { UserToken } from './UserToken';

export interface UserAuth {
	create(email: string, password: string): Promise<string>;
	login(email: string, password: string): Promise<UserToken>;
	updatePassword(email: string, password: string, newPassword: string): Promise<void>;
}

