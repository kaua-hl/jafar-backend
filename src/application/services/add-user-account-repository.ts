import { PrimaryUserRegistration } from "../../domain/entities/primary-user-registration";

export interface AddUserAccountRepository {
	add: (data: PrimaryUserRegistration) => Promise<any>;
}
