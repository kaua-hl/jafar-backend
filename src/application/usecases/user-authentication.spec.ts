import { InMemoryDatabase } from "../../../test/utils/in-memory-database";
import { Authentication } from "../../domain/usecases/authentication";
import { Encrypter } from "../services/encrypter";
import { HashComparer } from "../services/hash-comparer";
import { UserAuthentication } from "./user-authentication";

class EncrypterSpy implements Encrypter {
	data: any;
	accessToken: string = "token";

	async encrypt(data: Authentication.Params): Promise<string> {
		this.data = data;
		return this.accessToken;
	}
}

class HashComparerSpy implements HashComparer {
	result = true;

	async comparer(plaintext: string, digest: string): Promise<boolean> {
		return this.result;
	}
}

type SutTypes = {
	sut: UserAuthentication;
	encrypterSpy: EncrypterSpy;
	inMemoryDatabase: InMemoryDatabase;
	hashComparer: HashComparerSpy;
};

const makeSut = (): SutTypes => {
	const hashComparer = new HashComparerSpy();
	const encrypterSpy = new EncrypterSpy();
	const inMemoryDatabase = new InMemoryDatabase();
	const sut = new UserAuthentication(encrypterSpy, hashComparer, inMemoryDatabase);

	return {
		sut,
		encrypterSpy,
		inMemoryDatabase,
		hashComparer,
	};
};

const fakeUserAuth: any = {
	email: "maicon@gmail.com",
	password: "1234565",
};

const fakeUserData: any = {
	name: "Maicon",
	lastname: "Silva Nascimento",
	cpf: "121.345.456-45",
	email: "maicon@gmail.com",
	password: "1234565",
};

describe("UserAuthentication", () => {
	it("Should return an token with success", async () => {
		const { sut, encrypterSpy, inMemoryDatabase } = makeSut();
		await inMemoryDatabase.add(fakeUserData);
		const auth = await sut.auth(fakeUserAuth);
		expect(auth.accessToken).toBe(encrypterSpy.accessToken);
	});

	it("Should return null if an error occur", async () => {
		const { sut } = makeSut();
		const auth = await sut.auth(fakeUserAuth);
		expect(auth).toBeNull();
	});
});
