import { ValidationSpy } from "../../../../test/presentation/mocks/validation-spy";
import { fakeUserParams } from "../../../../test/utils/fake-user-params";
import { throwError } from "../../../../test/utils/throw-error";
import { AddAccount } from "../../../domain/usecases/add-account";
import { Authentication } from "../../../domain/usecases/authentication";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { SignUpController } from "./signup-controller";

type SutTypes = {
	sut: SignUpController;
	addAccountSpy: AddAccountSpy;
	authenticationSpy: AuthenticationSpy;
	validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
	const authenticationSpy = new AuthenticationSpy();
	const addAccountSpy = new AddAccountSpy();
	const validationSpy = new ValidationSpy();
	const sut = new SignUpController(addAccountSpy, authenticationSpy, validationSpy);

	return {
		sut,
		addAccountSpy,
		authenticationSpy,
		validationSpy,
	};
};

export class AddAccountSpy implements AddAccount {
	params: AddAccount.Params;
	result = true;

	async add(data: AddAccount.Params): Promise<AddAccount.Result> {
		this.params = data;
		return this.result;
	}
}

export class AuthenticationSpy implements Authentication {
	params: Authentication.Params;
	accessToken = "token";

	async auth(data: Authentication.Params): Promise<Authentication.Result> {
		this.params = data;
		return {
			accessToken: this.accessToken,
		};
	}
}

describe("SignUpController", () => {
	it("Should call Validation with correct value", async () => {
		const { sut, validationSpy } = makeSut();
		await sut.handle(fakeUserParams());
		expect(validationSpy.input).toEqual(fakeUserParams());
	});

	it("Should return 400 if Validation returns an error", async () => {
		const { sut, validationSpy } = makeSut();
		validationSpy.error = new InvalidParamError("password");
		const httpResponse = await sut.handle(fakeUserParams());
		expect(httpResponse.statusCode).toBe(400);
	});

	it("Should return status code 403 if the account already exists", async () => {
		const { sut, addAccountSpy } = makeSut();
		addAccountSpy.result = false;
		const httpResponse = await sut.handle(fakeUserParams());
		expect(httpResponse.statusCode).toBe(403);
	});

	it("Should call AddAccount with correct values", async () => {
		const { sut, addAccountSpy } = makeSut();
		const request = fakeUserParams();
		await sut.handle(fakeUserParams());
		expect(addAccountSpy.params).toEqual({
			name: request.name,
			email: request.email,
			lastname: request.lastname,
			cpf: request.cpf,
			password: request.password,
		});
	});

	it("Should return 500 if AddAccount throws", async () => {
		const { sut, addAccountSpy } = makeSut();
		jest.spyOn(addAccountSpy, "add").mockImplementationOnce(throwError);
		const httpResponse = await sut.handle(fakeUserParams());
		expect(httpResponse.statusCode).toBe(500);
	});

	it("Should call Authentication with correct values", async () => {
		const { sut, authenticationSpy } = makeSut();
		const request = fakeUserParams();
		await sut.handle(fakeUserParams());
		expect(authenticationSpy.params).toEqual({
			email: request.email,
			password: request.password,
		});
	});

	it("Should return 500 if Authentication throws", async () => {
		const { sut, authenticationSpy } = makeSut();
		jest.spyOn(authenticationSpy, "auth").mockImplementationOnce(throwError);
		const httpResponse = await sut.handle(fakeUserParams());
		expect(httpResponse.statusCode).toBe(500);
	});

	it("Should return a status 200 if valid data is provided", async () => {
		const { sut } = makeSut();
		const account = await sut.handle(fakeUserParams());
		expect(account.statusCode).toBe(200);
	});
});
