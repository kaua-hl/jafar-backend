export interface FindAccountByEmailRepository {
	findByEmail: (email: string) => Promise<boolean>;
}
