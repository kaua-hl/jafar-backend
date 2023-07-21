import { JwtAdapter } from "./jwt-adapter";

type SutTypes = {
	sut: JwtAdapter;
};

const makeSut = (): SutTypes => {
	const sut = new JwtAdapter();
	return {
		sut,
	};
};

describe("JwtAdapter", () => {
	it("Should call encrypter with correct values", async () => {
		const { sut } = makeSut();
		const encryptSpy = jest.spyOn(sut, "encrypt");
		await sut.encrypt("any_value");
		expect(encryptSpy).toHaveBeenCalledWith("any_value");
	});

	it("Should return a valid token with success ", async () => {
		const { sut } = makeSut();
		jest.spyOn(sut, "encrypt").mockImplementationOnce(async () => await Promise.resolve("any_token"));
		const encrypt = await sut.encrypt("any_value");
		expect(encrypt).toBe("any_token");
	});
});
