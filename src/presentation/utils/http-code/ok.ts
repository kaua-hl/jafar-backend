import { HttpResponse } from "../../models/http-response";

export const ok = (body: any): HttpResponse => {
	return {
		statusCode: 200,
		body,
	};
};
