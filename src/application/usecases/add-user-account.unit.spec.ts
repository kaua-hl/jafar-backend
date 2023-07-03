import { InMemoryDatabase } from "../../../test/utils/in-memory-database";
import { PrimaryUserRegistration } from "../../domain/entities/primary-user-registration";
import { AddUserAccount } from "./add-user-account";

type SutTypes = {
	sut: AddUserAccount;
	inMemoryDatabase: InMemoryDatabase;
};

const makeSut = (): SutTypes => {
	const findAccountByEmailRepository = new InMemoryDatabase();
	const addUserAccountRepository = new InMemoryDatabase();
	const inMemoryDatabase = new InMemoryDatabase();
	const sut = new AddUserAccount(findAccountByEmailRepository, addUserAccountRepository);

	return {
		sut,
		inMemoryDatabase,
	};
};

const fakeUserData: PrimaryUserRegistration = {
	name: "Maicon",
	lastname: "Silva Nascimento",
	cpf: "121.345.456-45",
	email: "maicon@gmail.com",
	password: "1234565",
};

describe("AddUserAccount", () => {
	it("Should return an account on success", async () => {
		const { sut } = makeSut();
		const account = await sut.add(fakeUserData);
		expect(account).toBe(fakeUserData);
	});

	it("Should return false if account exists", async () => {
		const { sut } = makeSut();
		const account = await sut.add(fakeUserData);
		const accountExisting = await sut.add(account);
		expect(accountExisting).toBe(false);
	});
});
