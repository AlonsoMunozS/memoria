import { UserAttributes } from "./UserAttributes"

export class User {
	readonly id: string
	readonly rut: string
	readonly email: string
	readonly createAt: number
	readonly userPermits?: Array<string>

	constructor({ id, rut, email, createAt, userPermits }: {
		id: string,
		rut: string,
		email: string,
		createAt: number
		userPermits?: Array<string>

	}) {
		this.id = id
		this.rut = rut
		this.email = email
		this.createAt = createAt
		this.userPermits = userPermits
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

		const user = new User({
			id,
			rut,
			email,
			createAt: currentDate,
			userPermits

		})
		return user
	}
}
