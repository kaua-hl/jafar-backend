import { Encrypter } from "../../application/services/encrypter";
import jwt from "jsonwebtoken";

export class JwtAdapter implements Encrypter {
	async encrypt(plaintext: string): Promise<string> {
		const token = jwt.sign({ plaintext }, "PRIVATE_KEY", { expiresIn: 60, algorithm: "HS256" });
		return token;
	}
}
