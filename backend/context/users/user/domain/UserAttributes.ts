import { UserPermits } from "./UserPermits"

export class UserAttributes {
	readonly rut: string
	readonly email: string
	readonly userPermits?: UserPermits

	constructor({
		rut,
		email,
		userPermits

	}: {
		rut: string,
		email: string,
		userPermits?: UserPermits
	}) {
		this.rut = rut
		this.email = email
		this.userPermits = userPermits

	}
}
