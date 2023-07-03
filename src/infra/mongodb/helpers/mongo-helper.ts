import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
	client: null as any as MongoClient,
	uri: null as any as string,

	async connect(uri: string): Promise<void> {
		this.client = await MongoClient.connect(uri);
		this.uri = uri;
	},

	async disconnect(): Promise<void> {
		this.client.close();
	},

	async getCollection(name: string): Promise<Collection> {
		if (!this.client) {
			await this.connect(this.uri);
		}
		return this.client.db().collection(name);
	},

	async clearCollection(name: string): Promise<void> {
		this.client.db().collection(name).deleteMany({});
	},
};
