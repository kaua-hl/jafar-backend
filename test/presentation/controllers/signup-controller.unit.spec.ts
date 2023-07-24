import { ValidationSpy } from "../mocks/validation-spy";
import { fakeUserParams } from "../../utils/fake-user-params";
import { throwError } from "../../utils/throw-error";
import { InvalidParamError } from "../../../src/presentation/errors/invalid-param-error";
import { SignUpController } from "../../../src/presentation/controllers/signup/signup-controller";
import { AddAccountSpy } from "../mocks/add-account-spy";
import { AuthenticationSpy } from "../mocks/authentication-spy";

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
