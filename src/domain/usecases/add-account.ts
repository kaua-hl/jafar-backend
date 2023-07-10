export interface AddAccount {
	add: (account: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
	export type Params = {
		name: string;
		lastname: string;
		cpf: string;
		email: string;
		password: string;
	};
	export type Result = boolean;
}
