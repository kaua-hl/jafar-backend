import { AuthenticationSpy } from "../../../../test/presentation/mocks/authentication-spy";
import { ValidationSpy } from "../../../../test/presentation/mocks/validation-spy";
import { fakeUserAuthParams } from "../../../../test/utils/fake-user-auth-params";
import { throwError } from "../../../../test/utils/throw-error";
import { InvalidParamError } from "../../errors/invalid-param-error";
import { LoginController } from "./login-controller";

type SutTypes = {
	sut: LoginController;
	validationSpy: ValidationSpy;
	authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy();
	const authenticationSpy = new AuthenticationSpy();
	const sut = new LoginController(validationSpy, authenticationSpy);
	return {
		sut,
		validationSpy,
		authenticationSpy,
	};
};

describe("LoginController", () => {
	it("Should call Validation with correct values", async () => {
		const { sut, validationSpy } = makeSut();
		const request = fakeUserAuthParams();
		await sut.handle(request);
		expect(validationSpy.input).toEqual(request);
	});

	it("Should return status 400 if validation fails", async () => {
		const { sut, validationSpy } = makeSut();
		validationSpy.error = new InvalidParamError("password");
		const account = await sut.handle(fakeUserAuthParams());
		expect(account.statusCode).toEqual(400);
	});

	it("Should call Authentication with correct values", async () => {
		const { sut, authenticationSpy } = makeSut();
		const request = fakeUserAuthParams();
		await sut.handle(request);
		expect(authenticationSpy.params).toEqual(request);
	});

	it("Should return 401 if invalid credentials are provided", async () => {
		const { sut, authenticationSpy } = makeSut();
		authenticationSpy.result = null;
		const account = await sut.handle(fakeUserAuthParams());
		expect(account.statusCode).toEqual(401);
	});

	it("Should return status 500 if Authentication fails", async () => {
		const { sut, authenticationSpy } = makeSut();
		jest.spyOn(authenticationSpy, "auth").mockImplementationOnce(throwError);
		const account = await sut.handle(fakeUserAuthParams());
		expect(account.statusCode).toEqual(500);
	});

	it("Should return status 200 login on success", async () => {
		const { sut } = makeSut();
		const account = await sut.handle(fakeUserAuthParams());
		expect(account.statusCode).toEqual(200);
	});
});
