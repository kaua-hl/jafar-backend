import { Authentication } from "../../domain/usecases/authentication";
import { Encrypter } from "../services/encrypter";
import { LoadAccountByEmailRepository } from "../services/load-account-by-email-repository";
import { HashComparer } from "../services/hash-comparer";

export class UserAuthentication implements Authentication {
	private readonly hashComparer: HashComparer;
	private readonly encrypter: Encrypter;
	private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;

	constructor(
		encrypter: Encrypter,
		hashComparer: HashComparer,
		loadAccountByEmailRepository: LoadAccountByEmailRepository
	) {
		this.encrypter = encrypter;
		this.hashComparer = hashComparer;
		this.loadAccountByEmailRepository = loadAccountByEmailRepository;
	}

	async auth(params: Authentication.Params): Promise<Authentication.Result> {
		const account = await this.loadAccountByEmailRepository.loadByEmail(params.email);
		if (account) {
			const isValid = await this.hashComparer.comparer(params.password, account.password);
			if (isValid) {
				const accessToken = await this.encrypter.encrypt(account.id);
				return {
					accessToken,
				};
			}
		}
		return null;
	}
}
