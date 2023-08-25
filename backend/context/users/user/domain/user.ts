import { UserAttributes } from "./UserAttributes"

export class User {
	readonly id: number
        readonly rut: string
        readonly email: string
        readonly createAt: number

	constructor({id, rut, email, createAt}: {
         id: number,
         rut: string,
         email: string,
         createAt: number

	}) {
        this.id = id
        this.rut=rut
        this.email = email
        this.createAt = createAt
	}
        
        static create({
		id,
		userAttributes,
	}: {
		id: number,
		userAttributes: UserAttributes,
	}): User {
		const currentDate = Date.now()
                const rut = userAttributes.rut
                const email  = userAttributes.email
		const user = new User({
			id,
			rut,
                        email,
			createAt: currentDate
		})
		return user
	}
}
