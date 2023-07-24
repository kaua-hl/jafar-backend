import { AddAccount } from "../../../domain/usecases/add-account";
import { Authentication } from "../../../domain/usecases/authentication";
import { EmailInUseError } from "../../errors/email-in-use-error";
import { HttpResponse } from "../../models/http-response";
import { Controller } from "../../protocols/controller";
import { Validation } from "../../protocols/validation";
import { badRequest } from "../../utils/http-code/bad-request";
import { forbidden } from "../../utils/http-code/forbidden";
import { ok } from "../../utils/http-code/ok";
import { serverError } from "../../utils/http-code/server-error";

export class SignUpController implements Controller {
	private readonly addAccount: AddAccount;
	private readonly authentication: Authentication;
	private readonly validation: Validation;

	constructor(addAccount: AddAccount, authentication: Authentication, validation: Validation) {
		this.addAccount = addAccount;
		this.authentication = authentication;
		this.validation = validation;
	}

	async handle(httpRequest: SignUpController.Params): Promise<HttpResponse> {
		try {
			const error = this.validation.validate(httpRequest);
			if (error) {
				return badRequest(error);
			}

			const { name, lastname, cpf, email, password } = httpRequest;

			const account = await this.addAccount.add({
				name,
				lastname,
				cpf,
				email,
				password,
			});

			if (!account) {
				return forbidden(new EmailInUseError());
			}

			const authToken = await this.authentication.auth({
				email,
				password,
			});

			return ok(authToken);
		} catch (error: any) {
			return serverError(error);
		}
	}
}

export namespace SignUpController {
	export type Params = {
		name: string;
		lastname: string;
		cpf: string;
		email: string;
		password: string;
		passwordConfirmation: string;
	};
}
