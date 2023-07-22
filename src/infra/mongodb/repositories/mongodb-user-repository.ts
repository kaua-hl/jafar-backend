import { AddAccountRepository } from "../../../application/services/add-user-account-repository";
import { CheckAccountRepository } from "../../../application/services/check-user-exists-repository";
import { LoadAccountByEmailRepository } from "../../../application/services/load-account-by-email-repository";
import { MongoHelper } from "../helpers/mongo-helper";

export class UserRepository implements AddAccountRepository, LoadAccountByEmailRepository, CheckAccountRepository {
	async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
		const collection = await MongoHelper.getCollection("accounts");
		const account = await collection.insertOne(data);
		return account.insertedId !== null;
	}

	async checkByEmail(email: string): Promise<any> {
		const collection = await MongoHelper.getCollection("accounts");
		const user = await collection.findOne(
			{ email },
			{
				projection: {
					_id: 1,
				},
			}
		);
		return user !== null;
	}

	async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
		const collection = await MongoHelper.getCollection("accounts");
		const account = await collection.findOne(
			{ email },
			{
				projection: {
					_id: 1,
					password: 1,
				},
			}
		);

		return MongoHelper.formatCollection(account);
	}
}
