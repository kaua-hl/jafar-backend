import { HashComparer } from "../../../src/application/services/hash-comparer";

export class HashComparerSpy implements HashComparer {
	result = true;
	digest: string;
	plaintext: string;

	async comparer(plaintext: string, digest: string): Promise<boolean> {
		this.plaintext = plaintext;
		this.digest = digest;
		return this.result;
	}
}
