import { Encrypter } from "../../../src/application/services/encrypter";

export class EncrypterSpy implements Encrypter {
	id: string;
	accessToken: string;

	async encrypt(id: string): Promise<string> {
		this.id = id;
		this.accessToken = "token";
		return this.accessToken;
	}
}
