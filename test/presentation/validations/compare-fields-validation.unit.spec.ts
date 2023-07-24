import { InvalidParamError } from "../../../src/presentation/errors/invalid-param-error";
import { CompareFieldsValidation } from "../../../src/presentation/validations/compare-fields-validation";
import { fakeUserParams } from "../../utils/fake-user-params";

interface SutTypes {
	sut: CompareFieldsValidation;
}

const field = "password";
const fieldToCompare = "passwordConfirmation";

const makeSut = (): SutTypes => {
	const sut = new CompareFieldsValidation(field, fieldToCompare);

	return {
		sut,
	};
};

describe("CompareFieldsValidation", () => {
	it("Should return a new InvalidParamError if validator fails", () => {
		const { sut } = makeSut();
		const validation = sut.validate({
			[field]: fakeUserParams().name,
			[fieldToCompare]: fakeUserParams().cpf,
		});
		expect(validation).toEqual(new InvalidParamError(fieldToCompare));
	});

	it("Should return undefined if validation on success", () => {
		const { sut } = makeSut();
		const validation = sut.validate({
			[field]: fakeUserParams().password,
			[fieldToCompare]: fakeUserParams().passwordConfirmation,
		});
		expect(validation).toBeUndefined();
	});
});
