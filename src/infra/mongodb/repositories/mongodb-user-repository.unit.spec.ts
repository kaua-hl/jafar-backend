import { PrimaryUserRegistration } from "../../../domain/entities/primary-user-registration";
import { MongoHelper } from "../helpers/mongo-helper";
import { UserRepository } from "./mongodb-user-repository";

type SutTypes = {
	sut: UserRepository;
};

const makeSut = (): SutTypes => {
	const sut = new UserRepository();
	return {
		sut,
	};
};

const fakeUserData: PrimaryUserRegistration = {
	name: "Maicon",
	lastname: "Silva Nascimento",
	cpf: "121.345.456-45",
	email: "maicon@gmail.com",
	password: "1234565",
};

describe("MongoDBUserRepository", () => {
	beforeAll(async () => {
		await MongoHelper.connect("mongodb://0.0.0.0:27017/jafar?authSource=admin");
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		await MongoHelper.clearCollection("accounts");
	});

	describe("Add", () => {
		it("Should return an account if successfully inserted into the database", async () => {
			const { sut } = makeSut();
			const account = await sut.add(fakeUserData);
			expect(account).toEqual(fakeUserData);
		});
	});

	describe("FindByEmail", () => {
		it("Should add account when valid data is provided", async () => {
			const { sut } = makeSut();
			const account = await sut.add(fakeUserData);
			const findUser = await sut.findByEmail(account.email);
			expect(findUser).toEqual(account);
		});

		it("Should return null when an account not exists", async () => {
			const { sut } = makeSut();
			const user = await sut.findByEmail(fakeUserData.email);
			expect(user).toBeNull();
		});
	});
});
