import { fakeUserParams } from "../../utils/fake-user-params";
import { MongoHelper } from "../../../src/infra/mongodb/helpers/mongo-helper";
import { UserRepository } from "../../../src/infra/mongodb/repositories/mongodb-user-repository";

import dotenv from "dotenv";
dotenv.config();

type SutTypes = {
	sut: UserRepository;
};

const makeSut = (): SutTypes => {
	const sut = new UserRepository();
	return {
		sut,
	};
};

const { passwordConfirmation, ...fakeUserData } = fakeUserParams();

describe("MongoDBUserRepository", () => {
	beforeAll(async () => {
		await MongoHelper.connect(process.env.BASE_URL);
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		await MongoHelper.clearCollection("accounts");
	});

	describe("UserRepository", () => {
		describe("Add", () => {
			it("Should return true if inserted the data into collection", async () => {
				const { sut } = makeSut();
				const account = await sut.add(fakeUserData);
				expect(account).toBe(true);
			});
		});

		describe("CheckByEmail", () => {
			it("Should return true if email is valid", async () => {
				const { sut } = makeSut();
				await sut.add(fakeUserParams());
				const exists = await sut.checkByEmail(fakeUserData.email);
				expect(exists).toBe(true);
			});

			it("Should return false if email is false", async () => {
				const { sut } = makeSut();
				const exists = await sut.checkByEmail(fakeUserData.email);
				expect(exists).toBe(false);
			});
		});

		describe("LoadByEmail", () => {
			it("Should return an account on success ", async () => {
				const { sut } = makeSut();
				await sut.add(fakeUserData);
				const account = await sut.loadByEmail(fakeUserData.email);
				expect(account.id).toBeTruthy();
				expect(account.password).toBe(fakeUserData.password);
			});

			it("Should return null if loadByEmail fails", async () => {
				const { sut } = makeSut();
				const account = await sut.loadByEmail(fakeUserData.email);
				expect(account).toBeNull();
			});
		});
	});
});
