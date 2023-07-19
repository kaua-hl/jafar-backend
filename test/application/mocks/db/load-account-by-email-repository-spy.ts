import { LoadAccountByEmailRepository } from "../../../../src/application/services/load-account-by-email-repository";
import { fakeUserAuthParams } from "../../../utils/fake-user-auth-params";

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
	email: string;
	result = {
		id: "1",
		...fakeUserAuthParams(),
	};

	async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
		this.email = email;
		return this.result;
	}
}
