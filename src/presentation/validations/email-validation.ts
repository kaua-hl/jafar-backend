import { InvalidParamError } from "../errors/invalid-param-error";
import { Validation } from "../protocols/validation";

export class EmailValidation implements Validation {
	private readonly fieldName: string;

	constructor(fieldName: string) {
		this.fieldName = fieldName;
	}

	validate(input: any): Error {
		const rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!rgx.test(input[this.fieldName])) {
			return new InvalidParamError(this.fieldName);
		}
	}
}
