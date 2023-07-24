import { MissingParamError } from "../../../src/presentation/errors/missing-param-error";
import { RequiredFieldValidation } from "../../../src/presentation/validations/required-field-validation";
import { fakeUserParams } from "../../utils/fake-user-params";

interface SutTypes {
	sut: RequiredFieldValidation;
}

const makeSut = (): SutTypes => {
	const sut = new RequiredFieldValidation("password");

	return {
		sut,
	};
};

describe("RequiredFieldValidation", () => {
	it("Should return a new MissingParamError if validator fails", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams().name);
		expect(validation).toEqual(new MissingParamError("password"));
	});

	it("Should return undefined if validation on success", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams());
		expect(validation).toBeUndefined();
	});
});
