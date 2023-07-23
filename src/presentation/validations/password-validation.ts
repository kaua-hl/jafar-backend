import { InvalidParamError } from "../errors/invalid-param-error";
import { Validation } from "../protocols/validation";

export class PasswordValidation implements Validation {
	private readonly fieldName: string;

	constructor(fieldName: string) {
		this.fieldName = fieldName;
	}

	validate(input: any): Error {
		const rgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
		if (!rgx.test(input[this.fieldName])) {
			return new InvalidParamError(this.fieldName);
		}
	}
}
