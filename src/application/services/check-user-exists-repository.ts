export interface CheckAccountRepository {
	checkByEmail: (email: string) => Promise<boolean>;
}
