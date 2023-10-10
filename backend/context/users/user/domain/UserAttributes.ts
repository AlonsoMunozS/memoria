import { UserPermits } from "./UserPermits"

export class UserAttributes {
	readonly rut: string
	readonly email: string
	readonly userPermits?: UserPermits
	readonly role: string

	constructor({
		rut,
		email,
		userPermits,
		role
	}: {
		rut: string,
		email: string,
		userPermits?: UserPermits
		role: string
	}) {
		this.rut = rut
		this.email = email
		this.userPermits = userPermits
		this.role = role

	}
}
