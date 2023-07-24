import { Authentication } from "../../../src/domain/usecases/authentication";

export class AuthenticationSpy implements Authentication {
	params: Authentication.Params;
	result = {
		accessToken: "token",
	};

	async auth(data: Authentication.Params): Promise<Authentication.Result> {
		this.params = data;
		return this.result;
	}
}
