import { PrimaryUserRegistration } from "../entities/primary-user-registration";

export interface AddAccount {
	add: (data: PrimaryUserRegistration) => Promise<any>;
}
