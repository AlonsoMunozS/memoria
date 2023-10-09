import { UserPermits } from "./UserPermits"

export class UserAttributes {
	readonly rut: string
	readonly email: string
	readonly userPermits?: Array<string>
	readonly role: string

	constructor({
		rut,
		email,
		userPermits,
		role
	}: {
		rut: string,
		email: string,
		userPermits?: Array<string>,
		role: string
	}) {
		this.rut = rut
		this.email = email
		this.userPermits = userPermits
		this.role = role

	}
}
