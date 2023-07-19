export class MissingParamError extends Error {
	constructor(paramName: string) {
		super(`Param ${paramName} is not provided`);
		this.name = "MissingParamError";
	}
}
