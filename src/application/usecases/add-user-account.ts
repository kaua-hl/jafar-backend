import { AddAccount } from "../../domain/usecases/add-account";
import { AddAccountRepository } from "../services/add-user-account-repository";
import { CheckAccountRepository } from "../services/check-user-exists-repository";
import { Hasher } from "../services/hasher";

export class AddUserAccount implements AddAccount {
	private readonly checkAccountRepository: CheckAccountRepository;
	private readonly hasher: Hasher;
	private readonly addAccountRepository: AddAccountRepository;

	constructor(
		checkAccountRepository: CheckAccountRepository,
		addAccountRepository: AddAccountRepository,
		hasher: Hasher
	) {
		this.checkAccountRepository = checkAccountRepository;
		this.addAccountRepository = addAccountRepository;
		this.hasher = hasher;
	}

	async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
		const verifyUserExists = await this.checkAccountRepository.checkByEmail(accountData.email);
		let isValid = false;
		if (!verifyUserExists) {
			const hashedPassword = await this.hasher.hash(accountData.password);
			isValid = await this.addAccountRepository.add({ ...accountData, password: hashedPassword });
		}
		return isValid;
	}
}
