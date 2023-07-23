import { InvalidParamError } from "../../../src/presentation/errors/invalid-param-error";
import { PasswordValidation } from "../../../src/presentation/validations/password-validation";
import { fakeUserParams } from "../../utils/fake-user-params";

interface SutTypes {
	sut: PasswordValidation;
}

const makeSut = (): SutTypes => {
	const sut = new PasswordValidation("password");

	return {
		sut,
	};
};

describe("PasswordValidation", () => {
	it("Should return a new InvalidParamError if validator fails", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams().name);
		expect(validation).toEqual(new InvalidParamError("password"));
	});

	it("Should return undefined if validation on success", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams());
		expect(validation).toBeUndefined();
	});
});
