import { MissingParamError } from "../../../src/presentation/errors/missing-param-error";
import { ValidationComposite } from "../../../src/presentation/validations/validation-composite";
import { fakeUserParams } from "../../utils/fake-user-params";
import { ValidationSpy } from "../mocks/validation-spy";

type SutTypes = {
	sut: ValidationComposite;
	validationSpies: ValidationSpy[];
};

const makeSut = (): SutTypes => {
	const validationSpies = [new ValidationSpy(), new ValidationSpy()];
	const sut = new ValidationComposite(validationSpies);

	return {
		sut,
		validationSpies,
	};
};

describe("ValidationComposite", () => {
	it("Should return an error if any validation fails", () => {
		const { sut, validationSpies } = makeSut();
		validationSpies[0].error = new MissingParamError("password");
		const validation = sut.validate(fakeUserParams());
		expect(validation).toEqual(validationSpies[0].error);
	});

	it("Should return the first error if more then one validation fails", () => {
		const { sut, validationSpies } = makeSut();
		validationSpies[0].error = new Error();
		validationSpies[1].error = new MissingParamError("email");
		const validation = sut.validate(fakeUserParams());
		expect(validation).toEqual(validationSpies[0].error);
	});

	it("Should return undefined if validation on success", () => {
		const { sut } = makeSut();
		const validation = sut.validate(fakeUserParams());
		expect(validation).toBeUndefined();
	});
});
