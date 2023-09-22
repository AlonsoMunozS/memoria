import { UserAttributes } from "../../domain/UserAttributes";

export type CreateUserRequest = {
	userAttributes: UserAttributes
	password: string
}