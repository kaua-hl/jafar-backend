import { InMemoryDatabase } from "../../../test/utils/in-memory-database";
import { Hasher } from "../services/hasher";
import { AddUserAccount } from "./add-user-account";

type SutTypes = {
	sut: AddUserAccount;
	inMemoryDatabase: InMemoryDatabase;
	hasherSpy: HasherSpy;
};

const makeSut = (): SutTypes => {
	const checkAccountRepository = new InMemoryDatabase();
	const addUserAccountRepository = new InMemoryDatabase();
	const inMemoryDatabase = new InMemoryDatabase();
	const hasherSpy = new HasherSpy();
	const sut = new AddUserAccount(checkAccountRepository, addUserAccountRepository, hasherSpy);

	return {
		sut,
		inMemoryDatabase,
		hasherSpy,
	};
};

class HasherSpy implements Hasher {
	hashed: string;
	plaintext: string;

	async hash(plaintext: string): Promise<string> {
		this.plaintext = plaintext;
		this.hashed = "hashed_password";
		return this.hashed;
	}
}

const fakeUserData: any = {
	name: "Maicon",
	lastname: "Silva Nascimento",
	cpf: "121.345.456-45",
	email: "maicon@gmail.com",
	password: "1234565",
};

describe("AddUserAccount", () => {
	it("Should return false if account already exists", async () => {
		const { sut } = makeSut();
		await sut.add(fakeUserData);
		const account = await sut.add(fakeUserData);
		expect(account).toBe(false);
	});

	it("Should return true if account insert into database", async () => {
		const { sut } = makeSut();
		const account = await sut.add(fakeUserData);
		expect(account).toBe(true);
	});
});
