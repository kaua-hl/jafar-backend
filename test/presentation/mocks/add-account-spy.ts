import { AddAccount } from "../../../src/domain/usecases/add-account";

export class AddAccountSpy implements AddAccount {
	params: AddAccount.Params;
	result = true;

	async add(data: AddAccount.Params): Promise<AddAccount.Result> {
		this.params = data;
		return this.result;
	}
}
