import { UserPermits } from "./UserPermits"

export class UserAttributes {
	readonly name: string
	readonly rut: string
	readonly email: string
	readonly userPermits?: UserPermits
	readonly role: string

	constructor({
		name,
		rut,
		email,
		userPermits,
		role
	}: {
		name: string,
		rut: string,
		email: string,
		userPermits?: UserPermits
		role: string
	}) {
		this.name = name
		this.rut = rut
		this.email = email
		this.userPermits = userPermits
		this.role = role

	}
}
