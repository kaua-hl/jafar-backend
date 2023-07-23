import { fakeUserParams } from "../../../test/utils/fake-user-params";
import { InvalidParamError } from "../errors/invalid-param-error";
import { EmailValidation } from "./email-validation";

interface SutTypes {
	sut: EmailValidation;
}

const makeSut = (): SutTypes => {
	const sut = new EmailValidation("email");

	return {
		sut,
	};
};

describe("EmailValidation", () => {
	it("Should return a new InvalidParamError if validator fails", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams().name);
		expect(validation).toEqual(new InvalidParamError("email"));
	});

	it("Should return undefined if validation on success", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams());
		expect(validation).toBeUndefined();
	});
});
