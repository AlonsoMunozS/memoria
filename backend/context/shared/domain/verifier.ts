
export interface Verifier {
	verifyToken(token: string): Promise<string>;
}

