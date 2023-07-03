import { AddUserAccountRepository } from "../../../application/services/add-user-account-repository";
import { FindAccountByEmailRepository } from "../../../application/services/find-account-by-email-repository";
import { PrimaryUserRegistration } from "../../../domain/entities/primary-user-registration";
import { MongoHelper } from "../helpers/mongo-helper";

export class UserRepository implements AddUserAccountRepository, FindAccountByEmailRepository {
	async add(data: PrimaryUserRegistration): Promise<any> {
		const collection = await MongoHelper.getCollection("accounts");
		const account = await collection.insertOne(data);
		const result = await collection.findOne(account.insertedId);
		return result;
	}

	async findByEmail(email: string): Promise<any> {
		const collection = await MongoHelper.getCollection("accounts");
		const user = await collection.findOne({ email });
		return user;
	}
}
