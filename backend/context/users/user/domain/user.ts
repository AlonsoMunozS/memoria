import { UserPermits } from "./UserPermits"
import { UserAttributes } from "./UserAttributes"

export class User {
	readonly id: string
	readonly rut: string
	readonly email: string
	readonly createAt: number
	readonly userPermits?: UserPermits
	readonly role: string

	constructor({ id, rut, email, createAt, userPermits, role }: {
		id: string,
		rut: string,
		email: string,
		createAt: number
		userPermits?: UserPermits
		role: string

	}) {
		this.id = id
		this.rut = rut
		this.email = email
		this.createAt = createAt
		this.userPermits = userPermits
		this.role = role
	}

	static create({
		id,
		userAttributes,
	}: {
		id: string,
		userAttributes: UserAttributes,
	}): User {
		const currentDate = Date.now()
		const rut = userAttributes.rut
		const email = userAttributes.email
		const userPermits = userAttributes.userPermits
		const role = userAttributes.role

		const user = new User({
			id,
			rut,
			email,
			createAt: currentDate,
			userPermits,
			role

		})
		return user
	}
}
