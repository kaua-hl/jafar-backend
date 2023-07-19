import { Hasher } from "../../../src/application/services/hasher";

export class HasherSpy implements Hasher {
	hashed = "hashed_password";
	plaintext: string;

	async hash(plaintext: string): Promise<string> {
		this.plaintext = plaintext;
		return this.hashed;
	}
}
