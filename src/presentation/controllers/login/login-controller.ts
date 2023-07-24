import { Authentication } from "../../../domain/usecases/authentication";
import { HttpResponse } from "../../models/http-response";
import { Controller } from "../../protocols/controller";
import { Validation } from "../../protocols/validation";
import { badRequest } from "../../utils/http-code/bad-request";
import { ok } from "../../utils/http-code/ok";
import { serverError } from "../../utils/http-code/server-error";
import { unauthorized } from "../../utils/http-code/unauthorized";

export class LoginController implements Controller {
	private readonly validation: Validation;
	private readonly authentication: Authentication;

	constructor(validation: Validation, authentication: Authentication) {
		this.validation = validation;
		this.authentication = authentication;
	}

	async handle(httpRequest: LoginController.Params): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest);
			if (error) {
				return badRequest(error);
			}
			const authentication = await this.authentication.auth(httpRequest);
			if (!authentication) {
				return unauthorized();
			}
			return ok(authentication);
		} catch (error: any) {
			return serverError(error);
		}
	}
}

export namespace LoginController {
	export type Params = {
		email: string;
		password: string;
	};
}
