export class UserCredentials {
    readonly email: string;
    readonly password: string;

    constructor({ email, password }: { email: string; password: string }) {
        this.email = email;
        this.password = password;
    }
}