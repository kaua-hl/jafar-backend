import { HashComparer } from "../../application/services/hash-comparer";
import { Hasher } from "../../application/services/hasher";
import bcrypt from "bcrypt";

export class BcryptAdapter implements Hasher, HashComparer {
	async hash(plaintext: string): Promise<string> {
		const digest = await bcrypt.hash(plaintext, 10);
		return digest;
	}

	async comparer(plaintext: string, digest: string): Promise<boolean> {
		const compare = await bcrypt.compare(plaintext, digest);
		return compare;
	}
}
