import { PrimaryUserRegistration } from "../../domain/entities/primary-user-registration";
import { AddAccount } from "../../domain/usecases/add-account";
import { AddUserAccountRepository } from "../services/add-user-account-repository";
import { FindAccountByEmailRepository } from "../services/find-account-by-email-repository";

export class AddUserAccount implements AddAccount {
	private readonly findAccountByEmailRepository: FindAccountByEmailRepository;
	private readonly addUserAccountRepository: AddUserAccountRepository;

	constructor(
		findAccountByEmailRepository: FindAccountByEmailRepository,
		addUserAccountRepository: AddUserAccountRepository
	) {
		this.findAccountByEmailRepository = findAccountByEmailRepository;
		this.addUserAccountRepository = addUserAccountRepository;
	}

	async add(data: PrimaryUserRegistration): Promise<any> {
		const verifyUserExists = await this.findAccountByEmailRepository.findByEmail(data.email);
		let isValid = false;
		if (!verifyUserExists) {
			const account = await this.addUserAccountRepository.add(data);
			isValid = account;
		}
		return isValid;
	}
}
