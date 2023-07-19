import { UserAuthentication } from "../../../src/application/usecases/user-authentication";
import { fakeUserAuthParams } from "../../utils/fake-user-auth-params";
import { LoadAccountByEmailRepositorySpy } from "../mocks/db/load-account-by-email-repository-spy";
import { EncrypterSpy } from "../mocks/encrypter-spy";
import { HashComparerSpy } from "../mocks/hash-comparer-spy";

type SutTypes = {
	sut: UserAuthentication;
	encrypterSpy: EncrypterSpy;
	loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy;
	hashComparer: HashComparerSpy;
};

const makeSut = (): SutTypes => {
	const hashComparer = new HashComparerSpy();
	const encrypterSpy = new EncrypterSpy();
	const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy();
	const sut = new UserAuthentication(encrypterSpy, hashComparer, loadAccountByEmailRepositorySpy);

	return {
		sut,
		encrypterSpy,
		loadAccountByEmailRepositorySpy,
		hashComparer,
	};
};

describe("UserAuthentication", () => {
	it("Should return an token with success if valid params is provided", async () => {
		const { sut, encrypterSpy } = makeSut();
		const auth = await sut.auth(fakeUserAuthParams());
		expect(auth.accessToken).toBe(encrypterSpy.accessToken);
	});

	it("Should return null if auth fail", async () => {
		const { sut, loadAccountByEmailRepositorySpy } = makeSut();
		loadAccountByEmailRepositorySpy.result = null;
		const auth = await sut.auth(fakeUserAuthParams());
		expect(auth).toBeNull();
	});
});
