import { BcryptAdapter } from "../../../src/infra/cryptography/bcrypt-adapter";

type SutTypes = {
	sut: BcryptAdapter;
};

const makeSut = (): SutTypes => {
	const sut = new BcryptAdapter();
	return {
		sut,
	};
};

describe("BcryptAdapter", () => {
	describe("Hash", () => {
		it("Should call hash with correct values", async () => {
			const { sut } = makeSut();
			const hashSpy = jest.spyOn(sut, "hash");
			await sut.hash("any_value");
			expect(hashSpy).toHaveBeenCalledWith("any_value");
		});

		it("Should return an valid hash with success", async () => {
			const { sut } = makeSut();
			jest.spyOn(sut, "hash").mockImplementationOnce(async () => await Promise.resolve("hashed_value"));
			const hashed = await sut.hash("any_value");
			expect(hashed).toBe("hashed_value");
		});
	});

	describe("Compare", () => {
		it("Should receive and compare correct params", async () => {
			const { sut } = makeSut();
			const hashSpy = jest.spyOn(sut, "comparer");
			await sut.comparer("any_value", "any_hasher");
			expect(hashSpy).toHaveBeenCalledWith("any_value", "any_hasher");
		});

		it("Should return false if compare is false", async () => {
			const { sut } = makeSut();
			const compare = await sut.comparer("any_value", "any_hasher");
			expect(compare).toBe(false);
		});

		it("Should return true if compare is true", async () => {
			const { sut } = makeSut();
			jest.spyOn(sut, "comparer").mockImplementationOnce(async () => await Promise.resolve(true));
			const compare = await sut.comparer("any_value", "any_hasher");
			expect(compare).toBe(true);
		});
	});
});
