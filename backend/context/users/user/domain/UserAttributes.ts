
export class UserAttributes {
	readonly rut: string
	readonly email: string
	readonly userPermits?: Array<string>

	constructor({
		rut,
		email,
		userPermits

	}: {
		rut: string,
		email: string,
		userPermits?: Array<string>
	}) {
		this.rut = rut
		this.email = email
		this.userPermits = userPermits

	}
}
