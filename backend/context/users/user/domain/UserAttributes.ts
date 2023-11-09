import { UserPermits } from "./UserPermits"

export class UserAttributes {
	readonly rut: string
	readonly name: string
	readonly email: string
	readonly userPermits?: UserPermits
	readonly role: string

	constructor({
		rut,
		name,
		email,
		userPermits,
		role
	}: {
		rut: string,
		name: string,
		email: string,
		userPermits?: UserPermits
		role: string
	}) {
		this.rut = rut
		this.name = name
		this.email = email
		this.userPermits = userPermits
		this.role = role

	}
}
