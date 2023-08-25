
export class UserAttributes{
        readonly rut: string
        readonly email: string

	constructor({
		rut,
		email,

	} : {
		rut: string,
		email: string,

	}) {
		this.rut = rut
		this.email = email

	}
}
