import { UserAttributes } from "./UserAttributes";
import { User } from "./user"

export interface UserAuth {
	create(userAttributes: UserAttributes, password: string): Promise<void>;
}

