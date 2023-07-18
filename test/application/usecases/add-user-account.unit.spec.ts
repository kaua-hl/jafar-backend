import { InMemoryDatabase } from "../../utils/in-memory-database";
import { AddUserAccount } from "../../../src/application/usecases/add-user-account";
import { fakeUserParams } from "../../utils/fake-user-params";
import { HasherSpy } from "../../infra/cryptography/hasher-spy";

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

describe("AddUserAccount", () => {
	it("Should return false if account already exists", async () => {
		const { sut } = makeSut();
		await sut.add(fakeUserParams());
		const account = await sut.add(fakeUserParams());
		expect(account).toBe(false);
	});

	it("Should return true if account inserted", async () => {
		const { sut } = makeSut();
		const account = await sut.add(fakeUserParams());
		expect(account).toBe(true);
	});

	it("Should call Hasher with correct plaintext", async () => {
		const { sut, hasherSpy } = makeSut();
		const userParams = fakeUserParams();
		await sut.add(userParams);
		expect(hasherSpy.plaintext).toBe(userParams.password);
	});
});
